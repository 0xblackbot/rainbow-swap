import axios from 'axios';
import {
    FC,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

import {ComplianceModal} from './compliance-modal';
import {
    acceptCompliancePolicy,
    getComplianceStatus,
    getTonProofPayload,
    verifyTonProof
} from './compliance.api';
import {
    COMPLIANCE_POLICY_VERSION,
    TON_PROOF_REFRESH_INTERVAL_MS,
    WALLET_SESSION_STORAGE_KEY
} from './compliance.constants';
import {ComplianceContext} from './compliance.context';
import {ComplianceStatusResponse, WalletSession} from './compliance.types';
import {INIT_DATA, IS_TMA} from '../globals';
import {useTonConnectUI} from '../tonconnect/useTonConnectUI';
import {useTonWallet} from '../tonconnect/useTonWallet';

type ComplianceState = 'accepted' | 'loading' | 'required' | 'unavailable';

interface ProofRequestCache {
    promise: Promise<WalletSession | undefined>;
    signature: string;
}

export const ComplianceProvider: FC<PropsWithChildren> = ({children}) => {
    const tonConnectUI = useTonConnectUI();
    const wallet = useTonWallet();
    const walletAddress = wallet?.account.address ?? '';
    const hasIdentity = IS_TMA || Boolean(walletAddress);
    const identityKey = IS_TMA
        ? 'telegram'
        : walletAddress
          ? `wallet:${walletAddress}`
          : '';
    const confirmationIdentityKey = IS_TMA ? 'telegram' : walletAddress;
    const tonProofReply = wallet?.connectItems?.tonProof;
    const tonProof =
        tonProofReply && 'proof' in tonProofReply
            ? tonProofReply.proof
            : undefined;

    const [complianceState, setComplianceState] =
        useState<ComplianceState>('unavailable');
    const [resolvedIdentityKey, setResolvedIdentityKey] = useState('');
    const [walletSession, setWalletSession] = useState<WalletSession>();
    const [dismissedConfirmationKey, setDismissedConfirmationKey] =
        useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [validationError, setValidationError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const proofRequestCache = useRef<ProofRequestCache>(undefined);

    const refreshTonProofPayload = useCallback(async () => {
        tonConnectUI.setConnectRequestParameters({state: 'loading'});

        try {
            const response = await getTonProofPayload();

            tonConnectUI.setConnectRequestParameters({
                state: 'ready',
                value: {tonProof: response.payload}
            });
        } catch (error) {
            console.error('Failed to configure TON proof', error);
            tonConnectUI.setConnectRequestParameters(null);
        }
    }, [tonConnectUI]);

    useEffect(() => {
        void refreshTonProofPayload();
        const intervalId = window.setInterval(
            refreshTonProofPayload,
            TON_PROOF_REFRESH_INTERVAL_MS
        );

        return () => {
            window.clearInterval(intervalId);
        };
    }, [refreshTonProofPayload]);

    const authenticateWallet = useCallback(
        async (ignoreStoredSession = false) => {
            if (!wallet || !walletAddress) {
                return undefined;
            }

            if (!ignoreStoredSession) {
                const storedSession = readWalletSession(walletAddress);

                if (storedSession) {
                    return storedSession;
                }
            }

            if (!tonProof) {
                return undefined;
            }

            if (proofRequestCache.current?.signature === tonProof.signature) {
                return proofRequestCache.current.promise;
            }

            const proofSignature = tonProof.signature;
            const request = verifyTonProof({
                initData: IS_TMA ? INIT_DATA : undefined,
                account: {
                    address: wallet.account.address,
                    chain: wallet.account.chain,
                    walletStateInit: wallet.account.walletStateInit
                },
                proof: tonProof
            })
                .then(response => {
                    const session = {
                        walletAddress: response.walletAddress,
                        walletToken: response.walletToken
                    };

                    writeWalletSession(session);

                    return session;
                })
                .catch(error => {
                    console.error('TON proof authentication failed', error);

                    return undefined;
                })
                .finally(() => {
                    if (
                        proofRequestCache.current?.signature === proofSignature
                    ) {
                        proofRequestCache.current = undefined;
                    }

                    void refreshTonProofPayload();
                });

            proofRequestCache.current = {
                signature: proofSignature,
                promise: request
            };

            return request;
        },
        [refreshTonProofPayload, tonProof, wallet, walletAddress]
    );

    useEffect(() => {
        if (!hasIdentity) {
            return;
        }

        let isCancelled = false;

        const loadStatus = async () => {
            setValidationError('');
            setErrorMessage('');

            let session = await authenticateWallet();
            let response: ComplianceStatusResponse | undefined;
            let walletStatusError: unknown;

            if (IS_TMA && session) {
                const attempt = await tryGetComplianceStatus({
                    initData: INIT_DATA,
                    walletToken: session.walletToken
                });
                response = attempt.response;
            }

            if (!response && session) {
                const attempt = await tryGetComplianceStatus({
                    walletToken: session.walletToken
                });
                response = attempt.response;
                walletStatusError = attempt.error;
            }

            if (!response && IS_TMA) {
                const attempt = await tryGetComplianceStatus({
                    initData: INIT_DATA
                });
                response = attempt.response;
            }

            if (session && isUnauthorized(walletStatusError)) {
                removeWalletSession(session);
                session = await authenticateWallet(true);

                if (session) {
                    const refreshedAttempt = await tryGetComplianceStatus({
                        initData: IS_TMA ? INIT_DATA : undefined,
                        walletToken: session.walletToken
                    });
                    const walletOnlyAttempt = refreshedAttempt.response
                        ? undefined
                        : await tryGetComplianceStatus({
                              walletToken: session.walletToken
                          });

                    response =
                        refreshedAttempt.response ??
                        walletOnlyAttempt?.response ??
                        response;
                }
            }

            if (isCancelled) {
                return;
            }

            setWalletSession(session);

            const isAccepted = response?.accepted === true;

            setComplianceState(isAccepted ? 'accepted' : 'required');
            setResolvedIdentityKey(identityKey);
        };

        void loadStatus();

        return () => {
            isCancelled = true;
        };
    }, [authenticateWallet, hasIdentity, identityKey, walletAddress]);

    const handleConfirm = useCallback(async () => {
        if (isSaving) {
            return;
        }

        if (!isChecked) {
            setValidationError(
                'Please accept the Terms and confirm your eligibility.'
            );

            return;
        }

        if (!IS_TMA && !walletSession) {
            setErrorMessage(
                'Disconnect and reconnect your wallet to verify ownership, then try again.'
            );

            return;
        }

        setIsSaving(true);
        setValidationError('');
        setErrorMessage('');

        try {
            if (IS_TMA && walletSession) {
                try {
                    await acceptCompliancePolicy(
                        {
                            initData: INIT_DATA,
                            walletToken: walletSession.walletToken
                        },
                        COMPLIANCE_POLICY_VERSION
                    );
                } catch {
                    try {
                        await acceptCompliancePolicy(
                            {walletToken: walletSession.walletToken},
                            COMPLIANCE_POLICY_VERSION
                        );
                    } catch (walletError) {
                        if (isUnauthorized(walletError)) {
                            removeWalletSession(walletSession);
                            setWalletSession(undefined);
                        }

                        await acceptCompliancePolicy(
                            {initData: INIT_DATA},
                            COMPLIANCE_POLICY_VERSION
                        );
                    }
                }
            } else if (IS_TMA) {
                await acceptCompliancePolicy(
                    {initData: INIT_DATA},
                    COMPLIANCE_POLICY_VERSION
                );
            } else if (walletSession) {
                await acceptCompliancePolicy(
                    {walletToken: walletSession.walletToken},
                    COMPLIANCE_POLICY_VERSION
                );
            } else {
                throw new Error('No verified wallet session is available');
            }

            setComplianceState('accepted');
            setResolvedIdentityKey(identityKey);
        } catch (error) {
            console.error('Failed to save compliance acceptance', error);
            setErrorMessage(
                'We could not save your confirmation. Please try again.'
            );
        } finally {
            setIsSaving(false);
        }
    }, [identityKey, isChecked, isSaving, walletSession]);

    const effectiveComplianceState = !hasIdentity
        ? 'unavailable'
        : resolvedIdentityKey === identityKey
          ? complianceState
          : 'loading';
    const requireAcceptance = useCallback(() => {
        if (effectiveComplianceState === 'accepted') {
            return true;
        }

        setDismissedConfirmationKey('');

        return false;
    }, [effectiveComplianceState]);
    const handleClose = useCallback(() => {
        setValidationError('');
        setDismissedConfirmationKey(confirmationIdentityKey);
    }, [confirmationIdentityKey]);
    const handleCheckedChange = useCallback((checked: boolean) => {
        setIsChecked(checked);
        setValidationError('');
    }, []);
    const contextValue = useMemo(
        () => ({
            isAccepted: effectiveComplianceState === 'accepted',
            requireAcceptance
        }),
        [effectiveComplianceState, requireAcceptance]
    );

    return (
        <ComplianceContext.Provider value={contextValue}>
            {children}
            <ComplianceModal
                errorMessage={errorMessage}
                isChecked={isChecked}
                isOpen={
                    effectiveComplianceState === 'required' &&
                    Boolean(confirmationIdentityKey) &&
                    dismissedConfirmationKey !== confirmationIdentityKey
                }
                isSaving={isSaving}
                validationError={validationError}
                onCheckedChange={handleCheckedChange}
                onClose={handleClose}
                onConfirm={handleConfirm}
            />
        </ComplianceContext.Provider>
    );
};

const readWalletSession = (walletAddress: string) => {
    try {
        const serializedSession = window.localStorage.getItem(
            WALLET_SESSION_STORAGE_KEY
        );

        if (!serializedSession) {
            return undefined;
        }

        const session = JSON.parse(serializedSession) as WalletSession;

        return session.walletAddress === walletAddress && session.walletToken
            ? session
            : undefined;
    } catch (error) {
        console.error('Failed to read wallet compliance session', error);

        return undefined;
    }
};

const writeWalletSession = (session: WalletSession) => {
    try {
        window.localStorage.setItem(
            WALLET_SESSION_STORAGE_KEY,
            JSON.stringify(session)
        );
    } catch (error) {
        console.error('Failed to store wallet compliance session', error);
    }
};

const removeWalletSession = (session: WalletSession) => {
    const storedSession = readWalletSession(session.walletAddress);

    if (storedSession?.walletToken !== session.walletToken) {
        return;
    }

    try {
        window.localStorage.removeItem(WALLET_SESSION_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to remove wallet compliance session', error);
    }
};

interface ComplianceCredentials {
    initData?: string;
    walletToken?: string;
}

const tryGetComplianceStatus = async (
    credentials: ComplianceCredentials
): Promise<{response?: ComplianceStatusResponse; error?: unknown}> => {
    try {
        return {response: await getComplianceStatus(credentials)};
    } catch (error) {
        console.error('Failed to load compliance status', error);

        return {error};
    }
};

const isUnauthorized = (error: unknown) =>
    axios.isAxiosError(error) && error.response?.status === 401;
