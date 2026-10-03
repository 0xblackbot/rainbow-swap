import {Address} from '@ton/core';
import {useEffect, useRef, useState} from 'react';

import styles from './rainbow-wallet.module.css';
import {ExternalLinkIcon} from '../../../assets/icons/ExternalLinkIcon/ExternalLinkIcon';
import {useDisableMainButton} from '../../../hooks/use-disable-main-button.hook';
import {useExplorerLinks} from '../../../hooks/use-explorer-links.hook';
import {useWalletAddress} from '../../../hooks/use-wallet-address.hook';
import {useDispatch, useSelector, store} from '../../../store';
import {setRainbowWithdrawalApprovalAction} from '../../../store/initialized/runtime-actions';
import {
    setRainbowWithdrawalAction,
    setRainbowWithdrawalCooldownAction
} from '../../../store/wallet/wallet-actions';
import {
    useRainbowWithdrawalSelector,
    useRainbowWithdrawalCooldownSelector,
    usePendingSwapSelector,
    useRainbowWalletSelector
} from '../../../store/wallet/wallet-selectors';
import {useTonConnectUI} from '../../../tonconnect/useTonConnectUI';
import {RainbowWalletInfo} from '../../../types/rainbow-wallet.type';
import {getRainbowWalletState} from '../../../utils/api.utils';
import {
    buildRainbowWithdrawalMessages,
    getRainbowJettonBalances,
    normalizedWithdrawalHash
} from '../../../utils/rainbow-wallet-withdrawal.utils';
import {showInfoToast, showErrorToast} from '../../../utils/toast.utils';
import {Button} from '../../button/button';
import {Divider} from '../../points-modal/social-tasks/divider/divider';
import sharedStyles from '../settings-modal.module.css';

type WithdrawalCheck =
    {status: 'idle' | 'loading'} | {status: 'error'; message: string};

const RainbowWalletControls = ({
    ownerAddress,
    wallet
}: {
    ownerAddress: string;
    wallet: RainbowWalletInfo;
}) => {
    const explorerLinks = useExplorerLinks();
    const pendingSwap = usePendingSwapSelector();
    const [check, setCheck] = useState<WithdrawalCheck>({status: 'idle'});
    const requestRef = useRef<AbortController | null>(null);

    useEffect(() => () => requestRef.current?.abort(), []);

    const dispatch = useDispatch();
    const tonConnectUI = useTonConnectUI();
    const withdrawal = useRainbowWithdrawalSelector();
    const cooldownUntil = useRainbowWithdrawalCooldownSelector();
    const approvalOwner = useSelector(
        ({runtime}) => runtime.rainbowWithdrawalApprovalOwner
    );
    const isApproving = approvalOwner !== null;
    const isPending = withdrawal?.status === 'pending';
    const [now, setNow] = useState(() => Date.now());
    const cooldownSeconds = Math.max(
        0,
        Math.ceil((cooldownUntil - now) / 1000)
    );
    useDisableMainButton(isApproving);

    useEffect(() => {
        if (cooldownUntil <= Date.now()) return;
        const timer = setInterval(() => {
            setNow(Date.now());
            if (Date.now() >= cooldownUntil) clearInterval(timer);
        }, 1000);
        return () => clearInterval(timer);
    }, [cooldownUntil]);

    const handleWithdraw = async () => {
        const currentStatus = isApproving
            ? 'Confirm the withdrawal in your connected wallet.'
            : isPending
              ? 'Withdrawal submitted. Wait for confirmation and your balance to update.'
              : requestRef.current
                ? 'Checking your Rainbow Wallet funds…'
                : pendingSwap.bocHash
                  ? 'Wait for your current swap to finish before withdrawing.'
                  : cooldownSeconds
                    ? 'Your Rainbow Wallet has no funds available to withdraw.'
                    : null;
        if (currentStatus) {
            showInfoToast(currentStatus);
            return;
        }
        const controller = new AbortController();
        requestRef.current = controller;
        setCheck({status: 'loading'});
        let approvalStarted = false;
        try {
            const [current, jettons] = await Promise.all([
                getRainbowWalletState(ownerAddress, controller.signal),
                getRainbowJettonBalances(wallet.address, controller.signal)
            ]);
            if (controller.signal.aborted) return;
            if (current.address !== wallet.address || !current.isDeployed) {
                throw new Error(
                    'Your Rainbow Wallet is not active. Please try again later.'
                );
            }
            const feature = tonConnectUI.wallet?.device.features.find(
                item =>
                    typeof item === 'object' && item.name === 'SendTransaction'
            );
            const maxMessages =
                typeof feature === 'object' && 'maxMessages' in feature
                    ? feature.maxMessages
                    : 4;
            const messages = buildRainbowWithdrawalMessages(
                current.address,
                current.tonBalance,
                jettons,
                maxMessages
            );
            if (!messages.length) {
                setNow(Date.now());
                dispatch(
                    setRainbowWithdrawalCooldownAction({
                        ownerAddress,
                        until: Date.now() + 30_000
                    })
                );
                showInfoToast(
                    'Your Rainbow Wallet has no funds available to withdraw.'
                );
                setCheck({status: 'idle'});
                return;
            }
            const connected = tonConnectUI.wallet?.account.address;
            if (
                !connected ||
                !Address.parse(connected).equals(Address.parse(ownerAddress))
            )
                return;
            const state = store.getState();
            if (
                state.wallet.swapsState.pending.bocHash ||
                state.runtime.rainbowWithdrawalApprovalOwner ||
                state.wallet.rainbowWithdrawals?.[ownerAddress]?.status ===
                    'pending'
            )
                return;
            dispatch(setRainbowWithdrawalApprovalAction(ownerAddress));
            approvalStarted = true;
            setCheck({status: 'idle'});
            const result = await tonConnectUI.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 60,
                from: connected,
                messages
            });
            dispatch(
                setRainbowWithdrawalAction({
                    ownerAddress,
                    hash: normalizedWithdrawalHash(result.boc),
                    messages,
                    submittedAt: Date.now(),
                    status: 'pending'
                })
            );
        } catch (error) {
            if (controller.signal.aborted && !approvalStarted) return;
            console.error('Rainbow Wallet withdrawal failed', error);
            const message = approvalStarted
                ? 'Withdrawal cancelled or submission could not be confirmed. Check your wallet before retrying.'
                : 'Unable to check your Rainbow Wallet. Please try again.';
            showErrorToast(message);
            if (!controller.signal.aborted)
                setCheck({status: 'error', message});
        } finally {
            if (approvalStarted)
                dispatch(setRainbowWithdrawalApprovalAction(null));
            if (requestRef.current === controller) requestRef.current = null;
            if (!controller.signal.aborted)
                setCheck(previous =>
                    previous.status === 'loading' ? {status: 'idle'} : previous
                );
        }
    };

    return (
        <>
            <Divider />
            <div className={`${sharedStyles.title_container} ${styles.header}`}>
                <p className={sharedStyles.title}>Rainbow Wallet</p>
                <Button
                    size="xs"
                    mode="bezeled"
                    className={styles.link_button}
                    Component="a"
                    href={explorerLinks.getWalletLink(wallet.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Rainbow Wallet in explorer"
                    title="View Rainbow Wallet in explorer"
                >
                    <ExternalLinkIcon className={styles.link_icon} />
                </Button>
            </div>
            <p className={sharedStyles.description}>
                Your personal routing wallet, used for swaps between DEXs that
                can’t connect directly.
            </p>
            <Button
                size="m"
                mode="bezeled"
                stretched={true}
                className={styles.withdraw_button}
                onClick={handleWithdraw}
                aria-disabled={
                    check.status === 'loading' ||
                    isApproving ||
                    isPending ||
                    cooldownSeconds > 0 ||
                    Boolean(pendingSwap.bocHash)
                }
                aria-busy={check.status === 'loading'}
            >
                <span>
                    {check.status === 'loading'
                        ? 'Checking funds…'
                        : 'Withdraw Funds'}
                </span>
            </Button>
            <div className={styles.status} role="status" aria-live="polite">
                {pendingSwap.bocHash && (
                    <p>
                        Wait for your current swap to finish before withdrawing.
                    </p>
                )}
                {check.status === 'error' && <p>{check.message}</p>}
                {withdrawal && (
                    <p>
                        {withdrawal.status === 'pending'
                            ? 'Withdrawal pending. '
                            : withdrawal.status === 'completed'
                              ? 'Withdrawal completed. '
                              : 'Withdrawal failed or partly completed. '}
                        <a
                            href={explorerLinks.getTransactionLink(
                                withdrawal.hash
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View transaction
                        </a>
                    </p>
                )}
            </div>
        </>
    );
};

export const RainbowWalletSetting = () => {
    const ownerAddress = useWalletAddress();
    const wallet = useRainbowWalletSelector();

    if (!ownerAddress || !wallet?.isDeployed) return null;

    return (
        <RainbowWalletControls
            key={`${ownerAddress}_${wallet.address}`}
            ownerAddress={ownerAddress}
            wallet={wallet}
        />
    );
};
