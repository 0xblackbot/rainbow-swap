import axios from 'axios';
import {combineEpics} from 'redux-observable';
import {Observable, switchMap, from, map, catchError, of, tap} from 'rxjs';
import {Action} from 'ts-action';
import {toPayload, ofType} from 'ts-action-operators';

import {loadBalancesActions} from './balances-actions';
import {BalancesArray} from '../../interfaces/balance-object.interface';

const loadBalancesEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadBalancesActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                axios.get<BalancesArray>(
                    `https://tonapi.io/v2/accounts/${payload.walletAddress}/jettons`
                )
            ).pipe(
                map(response => response.data.balances),
                tap(balances => console.log('Mapped Balances:', balances)),
                map(balances => loadBalancesActions.success(balances)),
                catchError(error => of(loadBalancesActions.fail(error.message)))
            )
        )
    );

export const loadBalancesEpics = combineEpics(loadBalancesEpic);
