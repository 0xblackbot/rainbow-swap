import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {API, DEBOUNCE_DUE_TIME} from '../../globals';
import {BestRouteResponse} from '../../types/best-route-response.type';

const loadSwapRoutesEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadSwapRoutesActions.submit),
        debounceTime(DEBOUNCE_DUE_TIME),
        toPayload(),
        switchMap(payload =>
            from(
                API.get<BestRouteResponse>('/best-route', {
                    params: payload
                })
            ).pipe(
                map(response => loadSwapRoutesActions.success(response.data)),
                catchError(err => of(loadSwapRoutesActions.fail(err.message)))
            )
        )
    );

export const swapRoutesEpics = combineEpics(loadSwapRoutesEpic);
