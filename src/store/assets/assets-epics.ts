import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {API, COIN_GECKO_API} from '../../globals';
import {AssetsRecord} from '../../types/assets-record.type';
import {mapAssetsRecordWithExchangeRate} from '../../utils/assets-record.ts';

const TON_COINGECKO_ID = 'the-open-network';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(
                Promise.all([
                    COIN_GECKO_API.get(`/coins/${TON_COINGECKO_ID}`),
                    API.get<AssetsRecord>('/assets-record')
                ])
            ).pipe(
                map(([tonPriceResponse, assetsResponse]) => {
                    const assetsRecord = mapAssetsRecordWithExchangeRate(
                        tonPriceResponse.data.market_data.current_price.usd,
                        assetsResponse.data
                    );

                    return loadAssetsActions.success(assetsRecord);
                }),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
