import axios from 'axios';
import {useEffect} from 'react';

import {useDispatch} from '../store';
import {
    loadBalancesActions,
    setRainbowWithdrawalAction
} from '../store/wallet/wallet-actions';
import {useRainbowWithdrawalSelector} from '../store/wallet/wallet-selectors';
import {
    getWithdrawalOutcome,
    getWithdrawalTrace
} from '../utils/rainbow-wallet-withdrawal.utils';
import {showErrorToast, showSuccessToast} from '../utils/toast.utils';

const CONFIRMATION_WINDOW_MS = 180_000;
export const useUpdateRainbowWithdrawal = () => {
    const dispatch = useDispatch();
    const withdrawal = useRainbowWithdrawalSelector();
    useEffect(() => {
        if (!withdrawal || withdrawal.status !== 'pending') return;
        const controller = new AbortController();
        const startedAt = Date.now();
        let timer: ReturnType<typeof setTimeout>;
        const poll = async () => {
            let nextDelay = 10_000;
            try {
                const trace = await getWithdrawalTrace(
                    withdrawal.hash,
                    controller.signal
                );
                if (controller.signal.aborted) return;
                const status = getWithdrawalOutcome(trace, withdrawal);
                if (status !== 'pending') {
                    dispatch(
                        setRainbowWithdrawalAction({...withdrawal, status})
                    );
                    dispatch(
                        loadBalancesActions.submit(withdrawal.ownerAddress)
                    );
                    if (status === 'completed')
                        showSuccessToast('Withdrawal completed.');
                    else
                        showErrorToast(
                            'Withdrawal failed or was only partly completed. Check the transaction before trying again.'
                        );
                    return;
                }
            } catch (error) {
                if (controller.signal.aborted) return;
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 429
                ) {
                    const retryAfter = error.response.headers['retry-after'];
                    const seconds = Number(retryAfter);
                    const retryAt = Number.isFinite(seconds)
                        ? Date.now() + seconds * 1000
                        : Date.parse(String(retryAfter));
                    if (Number.isFinite(retryAt))
                        nextDelay = Math.max(nextDelay, retryAt - Date.now());
                }
                if (
                    !axios.isAxiosError(error) ||
                    ![404, 429].includes(error.response?.status ?? 0)
                ) {
                    console.error(
                        'Rainbow withdrawal confirmation failed',
                        error
                    );
                }
            }
            if (Date.now() - startedAt < CONFIRMATION_WINDOW_MS) {
                timer = setTimeout(poll, nextDelay);
            }
        };
        timer = setTimeout(poll, 10_000);
        return () => {
            controller.abort();
            clearTimeout(timer);
        };
    }, [dispatch, withdrawal]);
};
