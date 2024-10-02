import {getAssetsRecord} from 'rainbow-swap-sdk';
import {combineEpics} from 'redux-observable';
import {catchError, concatMap, from, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {assetsInitializedAction} from '../initialized/initialized-actions';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(getAssetsRecord()).pipe(
                concatMap(assetsRecord => [
                    loadAssetsActions.success(assetsRecord),
                    assetsInitializedAction()
                ]),
                catchError(err =>
                    of(
                        loadAssetsActions.fail(err.message),
                        assetsInitializedAction()
                    )
                )
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
