import {Address} from '@ton/ton';
import axios from 'axios';
import {Epic, combineEpics} from 'redux-observable';
import {Observable, switchMap, from, map, catchError, of} from 'rxjs';
import {Action} from 'ts-action';
import {toPayload, ofType} from 'ts-action-operators';

import {
    addPendingSwapTransactionActions,
    walletActions
} from './wallet-actions';
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {waitTransactionConfirmation} from '../../utils/tonapi.utils';

const walletEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(walletActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                axios.get<BalancesArray>(
                    `https://tonapi.io/v2/accounts/${payload}/jettons`
                )
            ).pipe(
                map(response => {
                    const balancesRecord: Record<string, string> = {};
                    response.data.balances.forEach(balanceObject => {
                        const parsedAddress = Address.parse(
                            balanceObject.jetton.address
                        ).toString();

                        balancesRecord[parsedAddress] = (
                            parseFloat(balanceObject.balance) /
                            10 ** balanceObject.jetton.decimals
                        ).toString();
                    });

                    return balancesRecord;
                }),
                map(balancesRecord => walletActions.success(balancesRecord)),
                catchError(error => of(walletActions.fail(error.message)))
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
