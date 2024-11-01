import axios from 'axios';
import {combineEpics, Epic} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {
    checkTaskActions,
    claimRewardsActions,
    loadBalancesActions,
    loadUserAuthActions,
    loadWalletDataActions
} from './wallet-actions';
import {INIT_DATA} from '../../globals';
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {TonBalanceArray} from '../../interfaces/ton-balance-response.interface';
import {
    getClaimRewards,
    getTaskCheck,
    getUserAuth,
    getWalletData
} from '../../utils/api.utils';
import {getBalancesRecord} from '../../utils/balances-record.utils';

const loadBalancesEpic = (action$: Observable<Action>) =>
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

const loadUserAuthEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadUserAuthActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getUserAuth(payload)).pipe(
                map(response => loadUserAuthActions.success(response)),
                catchError(err => of(loadUserAuthActions.fail(err.message)))
            )
        )
    );

const loadWalletDataEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadWalletDataActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getWalletData(payload)).pipe(
                map(response => loadWalletDataActions.success(response)),
                catchError(err => of(loadWalletDataActions.fail(err.message)))
            )
        )
    );

const checkTaskEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkTaskActions.submit),
        toPayload(),
        switchMap(({taskType, walletAddress}) =>
            from(
                getTaskCheck({
                    initData: INIT_DATA,
                    taskType,
                    walletAddress
                })
            ).pipe(
                map(data => checkTaskActions.success({taskType, data})),
                catchError(err =>
                    of(
                        checkTaskActions.fail({
                            taskType,
                            error: err.message
                        })
                    )
                )
            )
        )
    );

const claimRewardsEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(claimRewardsActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getClaimRewards(payload)).pipe(
                map(response => claimRewardsActions.success(response)),
                catchError(err => of(claimRewardsActions.fail(err.message)))
            )
        )
    );

export const walletEpics = combineEpics(
    loadBalancesEpic,
    loadUserAuthEpic,
    loadWalletDataEpic,
    checkTaskEpic,
    claimRewardsEpic
);
