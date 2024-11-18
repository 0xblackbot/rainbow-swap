import {getAssetsList} from 'rainbow-swap-sdk';
import {combineEpics, Epic} from 'redux-observable';
import {concatMap, debounceTime, from, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadAssetsListActions} from './assets-actions';
import {DEBOUNCE_DUE_TIME} from '../../globals';
import {sentryCatchError} from '../../utils/sentry.utils';
import {assetsInitializedAction} from '../initialized/runtime-actions';

const loadAssetsListEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(loadAssetsListActions.submit),
        toPayload(),
        debounceTime(DEBOUNCE_DUE_TIME),
        switchMap(payload =>
            from(getAssetsList(payload)).pipe(
                concatMap(assetsList => [
                    loadAssetsListActions.success({
                        list: assetsList,
                        requestId: payload.requestId
                    }),
                    assetsInitializedAction()
                ]),
                sentryCatchError(err =>
                    of(
                        loadAssetsListActions.fail({
                            error: err.message,
                            requestId: payload.requestId
                        }),
                        assetsInitializedAction()
                    )
                )
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsListEpic);
