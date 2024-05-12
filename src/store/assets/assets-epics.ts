import {Action} from '@reduxjs/toolkit';
import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {API} from '../../globals';
import {AssetsRecord} from '../../types/assets-record.type';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(API.get<AssetsRecord>('/assets-record')).pipe(
                map(response => loadAssetsActions.success(response.data)),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
