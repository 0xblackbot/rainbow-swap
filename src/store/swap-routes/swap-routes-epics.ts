import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {
    addPendingSwapTransactionActions,
    loadSwapRoutesActions
} from './swap-routes-actions.ts';
import {API, DEBOUNCE_DUE_TIME} from '../../globals';
import {CalculatedSwapRoute} from '../../swap-routes/shared/calculated-swap-route.type.ts';
import {waitTransactionConfirmation} from '../../utils/tonapi.utils.ts';

const loadSwapRoutesEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadSwapRoutesActions.submit),
        debounceTime(DEBOUNCE_DUE_TIME),
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

export const swapRoutesEpics = combineEpics(
    loadSwapRoutesEpic,
    addPendingSwapTransactionEpic
);
