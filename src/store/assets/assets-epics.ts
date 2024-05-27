import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {API, COIN_GECKO_API, TON} from '../../globals';
import {AssetsRecord} from '../../types/assets-record.type';

const TON_COINGECKO_ID = 'the-open-network';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(API.get<AssetsRecord>('/assets-record')).pipe(
                switchMap(response =>
                    from(COIN_GECKO_API.get(`/coins/${TON_COINGECKO_ID}`)).pipe(
                        map(tonPrice => {
                            response.data[TON] = {
                                ...response.data[TON],
                                usdPrice:
                                    tonPrice.data.market_data.current_price.usd
                            };

                            return loadAssetsActions.success(response.data);
                        })
                    )
                ),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
