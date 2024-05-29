import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {API, COIN_GECKO_API} from '../../globals';
import {AssetsRecord} from '../../types/assets-record.type';
import {getExchangeRates} from '../../utils/get-exchange-rates.utils';

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
                    const tonPrice =
                        tonPriceResponse.data.market_data.current_price.usd;

                    const assetsWithExchangeRate = getExchangeRates(
                        tonPrice,
                        assetsResponse.data
                    );

                    return loadAssetsActions.success(assetsWithExchangeRate);
                }),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
