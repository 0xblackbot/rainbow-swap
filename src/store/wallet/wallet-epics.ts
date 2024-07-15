import axios from 'axios';
import {getIsRainbowWalletActive} from 'rainbow-swap-sdk';
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
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {TonBalanceArray} from '../../interfaces/ton-balance-response.interface';
import {getBalancesRecord} from '../../utils/balances-record.utils';
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
                concatMap(() => [
                    addPendingSwapTransactionActions.success(),
                    loadBalancesActions.submit(payload.senderRawAddress)
                ]),
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
        switchMap(payload =>
            from(getIsRainbowWalletActive(payload)).pipe(
                map(isActive =>
                    checkIsRainbowWalletActiveActions.success(isActive)
                ),
                catchError(err =>
                    of(checkIsRainbowWalletActiveActions.fail(err.message))
                )
            )
        )
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
                    loadBalancesActions.submit(payload.senderRawAddress),
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
