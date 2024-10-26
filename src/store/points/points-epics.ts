import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {
    checkTaskActions,
    claimRewardsActions,
    loadWalletPointsActions
} from './points-actions';
import {INIT_DATA} from '../../globals';
import {
    getClaimRewards,
    getTaskCheck,
    getWalletPoints
} from '../../utils/api.utils';

const loadWalletPointsEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadWalletPointsActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getWalletPoints(payload)).pipe(
                map(response => loadWalletPointsActions.success(response)),
                catchError(err => of(loadWalletPointsActions.fail(err.message)))
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

export const pointsEpics = combineEpics(
    loadWalletPointsEpic,
    checkTaskEpic,
    claimRewardsEpic
);
