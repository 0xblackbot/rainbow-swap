import {combineEpics, Epic} from 'redux-observable';
import {from, map, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadTradingCompetitionDataActions} from './trading-competition-actions';
import {getTradingCompetitionData} from '../../utils/api.utils';
import {sentryCatchError} from '../../utils/sentry.utils';

const loadTradingCompetitionDataEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadTradingCompetitionDataActions.submit),
        toPayload(),
        switchMap(payload =>
            from(getTradingCompetitionData(payload)).pipe(
                map(response =>
                    loadTradingCompetitionDataActions.success(response)
                ),
                sentryCatchError(err =>
                    of(loadTradingCompetitionDataActions.fail(err.message))
                )
            )
        )
    );

export const tradingCompetitionEpics = combineEpics(
    loadTradingCompetitionDataEpic
);
