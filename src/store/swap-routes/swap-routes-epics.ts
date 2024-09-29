import {getBestRoute} from 'rainbow-swap-sdk';
import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    switchMap,
    withLatestFrom
} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {DEBOUNCE_DUE_TIME} from '../../globals';
import {RootState} from '../index';

const loadSwapRoutesEpic: Epic<Action, Action, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(loadSwapRoutesActions.submit),
        toPayload(),
        debounceTime(DEBOUNCE_DUE_TIME),
        withLatestFrom(state$),
        switchMap(([payload, state]) => {
            if (payload.inputAssetAmount === '0') {
                return of(
                    loadSwapRoutesActions.success({
                        bestRoute: [],
                        priceImprovement: 0,
                        requestId: payload.requestId
                    })
                );
            }

            const maxDepth =
                payload.inputAssetAddress === payload.outputAssetAddress
                    ? RiskTolerance.Risky
                    : state.settings.riskTolerance;

            return from(
                getBestRoute({
                    ...payload,
                    maxDepth
                })
            ).pipe(
                map(response =>
                    loadSwapRoutesActions.success({
                        ...response,
                        requestId: payload.requestId
                    })
                ),
                catchError(err =>
                    of(
                        loadSwapRoutesActions.fail({
                            error: err.message,
                            requestId: payload.requestId
                        })
                    )
                )
            );
        })
    );

export const swapRoutesEpics = combineEpics(loadSwapRoutesEpic);
