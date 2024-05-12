import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadSwapRoutesActions} from './swap-routes-actions.ts';
import {API} from '../../globals';
import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type.ts';

const loadSwapRoutesEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadSwapRoutesActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                API.get<CalculatedSwapRoute[]>('/best-route', {
                    params: payload
                })
            ).pipe(
                map(response => loadSwapRoutesActions.success(response.data)),
                catchError(err => of(loadSwapRoutesActions.fail(err.message)))
            )
        )
    );

export const swapRoutesEpics = combineEpics(loadSwapRoutesEpic);
