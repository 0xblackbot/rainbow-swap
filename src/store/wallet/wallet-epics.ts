import axios from 'axios';
import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadBalancesActions} from './wallet-actions';
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {TonBalanceArray} from '../../interfaces/ton-balance-response.interface';
import {getBalancesRecord} from '../../utils/balances-record.utils';

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

export const walletEpics = combineEpics(walletEpic);
