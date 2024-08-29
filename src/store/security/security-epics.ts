import {getAppStatus} from 'rainbow-swap-sdk';
import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAppStatusActions} from './security-actions';

const loadAppStatusEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadAppStatusActions.submit),
        switchMap(() =>
            from(getAppStatus()).pipe(
                map(response => loadAppStatusActions.success(response)),
                catchError(err => of(loadAppStatusActions.fail(err.message)))
            )
        )
    );

export const securityEpics = combineEpics(loadAppStatusEpic);
