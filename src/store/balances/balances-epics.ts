import axios from 'axios';
import {combineEpics} from 'redux-observable';
import {Observable, switchMap, from, map, catchError, of} from 'rxjs';
import {Action} from 'ts-action';
import {toPayload, ofType} from 'ts-action-operators';

import {balancesActions} from './balances-actions';
import {BalancesArray} from '../../interfaces/balance-object.interface';

const balancesEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(balancesActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                axios.get<BalancesArray>(
                    `https://tonapi.io/v2/accounts/${payload}/jettons`
                )
            ).pipe(
                map(response => response.data.balances),
                map(balances => balancesActions.success(balances)),
                catchError(error => of(balancesActions.fail(error.message)))
            )
        )
    );

export const balancesEpics = combineEpics(balancesEpic);
