import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {bufferTime, catchError, filter, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {
    addTapActions,
    checkTelegramChannelTaskActions,
    checkTorchFinanceTelegramTaskActions,
    checkTorchFinanceTwitterTaskActions,
    checkXChannelTaskActions,
    loadPointsActions
} from './points-actions';
import {TaskTypeEnum} from '../../enums/task-type.enum';
import {INIT_DATA} from '../../globals';
import {getPointsAuth, getTaskCheck, postAddTaps} from '../../utils/api.utils';

const loadPointsEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadPointsActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getPointsAuth(payload)).pipe(
                map(response => loadPointsActions.success(response)),
                catchError(err => of(loadPointsActions.fail(err.message)))
            )
        )
    );

const addTapEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(addTapActions.submit),
        toPayload(),
        bufferTime(3000),
        filter(taps => taps.length > 0),
        switchMap(taps =>
            from(postAddTaps({initData: INIT_DATA, taps})).pipe(
                map(() => addTapActions.success()),
                catchError(err => of(addTapActions.fail(err.message)))
            )
        )
    );

const checkTelegramChannelTaskEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkTelegramChannelTaskActions.submit),
        switchMap(() =>
            from(
                getTaskCheck({
                    initData: INIT_DATA,
                    taskType: TaskTypeEnum.Telegram
                })
            ).pipe(
                map(response =>
                    checkTelegramChannelTaskActions.success(response)
                ),
                catchError(err =>
                    of(checkTelegramChannelTaskActions.fail(err.message))
                )
            )
        )
    );

const checkXChannelTaskEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkXChannelTaskActions.submit),
        switchMap(() =>
            from(
                getTaskCheck({
                    initData: INIT_DATA,
                    taskType: TaskTypeEnum.Twitter
                })
            ).pipe(
                map(response => checkXChannelTaskActions.success(response)),
                catchError(err =>
                    of(checkXChannelTaskActions.fail(err.message))
                )
            )
        )
    );

const checkFinanceTelegramTaskEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkTorchFinanceTelegramTaskActions.submit),
        switchMap(() =>
            from(
                getTaskCheck({
                    initData: INIT_DATA,
                    taskType: TaskTypeEnum.TorchFinance_Telegram
                })
            ).pipe(
                map(response =>
                    checkTorchFinanceTelegramTaskActions.success(response)
                ),
                catchError(err =>
                    of(checkTorchFinanceTelegramTaskActions.fail(err.message))
                )
            )
        )
    );

const checkFinanceTwitterTaskEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkTorchFinanceTwitterTaskActions.submit),
        switchMap(() =>
            from(
                getTaskCheck({
                    initData: INIT_DATA,
                    taskType: TaskTypeEnum.TorchFinance_Twitter
                })
            ).pipe(
                map(response =>
                    checkTorchFinanceTwitterTaskActions.success(response)
                ),
                catchError(err =>
                    of(checkTorchFinanceTwitterTaskActions.fail(err.message))
                )
            )
        )
    );

export const pointsEpics = combineEpics(
    loadPointsEpic,
    addTapEpic,
    checkTelegramChannelTaskEpic,
    checkXChannelTaskEpic,
    checkFinanceTelegramTaskEpic,
    checkFinanceTwitterTaskEpic
);
