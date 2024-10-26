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
    addPendingSwapTransactionActions,
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
                        `https://tonapi.io/v2/accounts/${payload}/jettons`,
                        {
                            params: {
                                supported_extensions: 'custom_payload'
                            }
                        }
                    ),
                    axios.get<TonBalanceArray>(
                        `https://tonapi.io/v2/accounts/${payload}`
                    )
                ])
            ).pipe(
                switchMap(([jettonsResponse, accountResponse]) =>
                    getBalancesRecord(jettonsResponse, accountResponse)
                ),
                map(balancesRecord =>
                    loadBalancesActions.success(balancesRecord)
                ),
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
                concatMap(() => {
                    const actions: Action<string>[] = [
                        addPendingSwapTransactionActions.success(),
                        loadBalancesActions.submit(payload.senderRawAddress)
                    ];

                    return actions;
                }),
                catchError(err =>
                    of(addPendingSwapTransactionActions.fail(err.message))
                )
            )
        )
    );

export const walletEpics = combineEpics(
    walletEpic,
    addPendingSwapTransactionEpic
);
