import {Address} from '@ton/ton';
import axios from 'axios';
import {Epic, combineEpics} from 'redux-observable';
import {Observable, switchMap, from, map, catchError, of, forkJoin} from 'rxjs';
import {Action} from 'ts-action';
import {toPayload, ofType} from 'ts-action-operators';

import {
    addPendingSwapTransactionActions,
    loadBalancesActions
} from './wallet-actions';
import {TON} from '../../globals';
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {BalancesRecord} from '../../types/balances-record.type';
import {fromNano} from '../../utils/big-int.utils';
import {waitTransactionConfirmation} from '../../utils/tonapi.utils';

const TON_DECIMALS = 9;

const walletEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadBalancesActions.submit),
        toPayload(),
        switchMap(payload =>
            forkJoin([
                from(
                    axios.get<BalancesArray>(
                        `https://tonapi.io/v2/accounts/${payload}/jettons`
                    )
                ),
                from(axios.get(`https://tonapi.io/v2/accounts/${payload}`))
            ]).pipe(
                map(([jettonsResponse, accountResponse]) => {
                    const balancesRecord: BalancesRecord = {};

                    jettonsResponse.data.balances.forEach(balanceObject => {
                        const parsedAddress = Address.parse(
                            balanceObject.jetton.address
                        ).toString();
                        balancesRecord[parsedAddress] = fromNano(
                            balanceObject.balance,
                            balanceObject.jetton.decimals
                        );
                    });

                    balancesRecord[TON] = fromNano(
                        BigInt(accountResponse.data.balance),
                        TON_DECIMALS
                    );

                    return balancesRecord;
                }),
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
                map(() => addPendingSwapTransactionActions.success()),
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
