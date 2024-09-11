import {getAssetsRecord} from 'rainbow-swap-sdk';
import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(getAssetsRecord()).pipe(
                map(assetsRecord => loadAssetsActions.success(assetsRecord)),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
