import {Address} from '@ton/ton';
import axios from 'axios';
import {Epic, combineEpics} from 'redux-observable';
import {
    Observable,
    switchMap,
    from,
    map,
    catchError,
    of,
    concatMap
} from 'rxjs';
import {Action} from 'ts-action';
import {toPayload, ofType} from 'ts-action-operators';

import {
    addPendingActivationTransactionActions,
    addPendingSwapTransactionActions,
    checkIsRainbowWalletActiveActions,
    loadBalancesActions
} from './wallet-actions';
import {TON_CLIENT, WORKCHAIN} from '../../globals.ts';
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {TonBalanceArray} from '../../interfaces/ton-balance-response.interface.ts';
import {RainbowWalletContract} from '../../swap-routes/rainbow/rainbow-wallet.contract.ts';
import {getBalancesRecord} from '../../utils/balances-record.utils.ts';
import {waitTransactionConfirmation} from '../../utils/tonapi.utils';

const walletEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadBalancesActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                Promise.all([
                    axios.get<BalancesArray>(
                        `https://tonapi.io/v2/accounts/${payload}/jettons`
                    ),
                    axios.get<TonBalanceArray>(
                        `https://tonapi.io/v2/accounts/${payload}`
                    )
                ])
            ).pipe(
                map(([jettonsResponse, accountResponse]) => {
                    const balancesRecord = getBalancesRecord(
                        jettonsResponse,
                        accountResponse
                    );

                    return loadBalancesActions.success(balancesRecord);
                }),
                catchError(error => of(loadBalancesActions.fail(error.message)))
            )
        )
    );

const addPendingSwapTransactionEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(addPendingSwapTransactionActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                waitTransactionConfirmation(
                    payload.senderRawAddress,
                    payload.bocHash
                )
            ).pipe(
                map(() => addPendingSwapTransactionActions.success()),
                catchError(err =>
                    of(addPendingSwapTransactionActions.fail(err.message))
                )
            )
        )
    );

const checkIsRainbowWalletActiveEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkIsRainbowWalletActiveActions.submit),
        toPayload(),
        switchMap(payload => {
            const walletAddress = Address.parse(payload);

            const rainbowWallet = RainbowWalletContract.create({
                workchain: WORKCHAIN,
                ownerAddress: walletAddress
            });

            const contractProvider = TON_CLIENT.provider(rainbowWallet.address);

            return from(contractProvider.getState()).pipe(
                map(state =>
                    checkIsRainbowWalletActiveActions.success(
                        state.state.type === 'active'
                    )
                ),
                catchError(err =>
                    of(checkIsRainbowWalletActiveActions.fail(err.message))
                )
            );
        })
    );

const addPendingActivationTransactionEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(addPendingActivationTransactionActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                waitTransactionConfirmation(
                    payload.senderRawAddress,
                    payload.bocHash
                )
            ).pipe(
                concatMap(() => [
                    addPendingActivationTransactionActions.success(),
                    checkIsRainbowWalletActiveActions.submit(
                        payload.senderRawAddress
                    )
                ]),
                catchError(err =>
                    of(addPendingActivationTransactionActions.fail(err.message))
                )
            )
        )
    );

export const walletEpics = combineEpics(
    walletEpic,
    addPendingSwapTransactionEpic,
    checkIsRainbowWalletActiveEpic,
    addPendingActivationTransactionEpic
);
