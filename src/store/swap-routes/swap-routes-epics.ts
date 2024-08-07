import {getBestRoute} from 'rainbow-swap-sdk';
import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {DEBOUNCE_DUE_TIME} from '../../globals';

const loadSwapRoutesEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadSwapRoutesActions.submit),
        debounceTime(DEBOUNCE_DUE_TIME),
        toPayload(),
        switchMap(payload => {
            if (payload.inputAssetAmount === '0') {
                return of(
                    loadSwapRoutesActions.success({
                        bestRoute: [],
                        priceImprovement: 0
                    })
                );
            }

            return from(getBestRoute(payload)).pipe(
                map(response => loadSwapRoutesActions.success(response)),
                catchError(err => of(loadSwapRoutesActions.fail(err.message)))
            );
        })
    );

export const swapRoutesEpics = combineEpics(loadSwapRoutesEpic);
