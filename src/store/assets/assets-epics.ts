import {getAssetsRecord} from 'rainbow-swap-sdk';
import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {COIN_GECKO_API} from '../../globals';
import {mapAssetsRecordWithExchangeRate} from '../../utils/assets-record';

const TON_COINGECKO_ID = 'the-open-network';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(
                Promise.all([
                    COIN_GECKO_API.get(`/coins/${TON_COINGECKO_ID}`),
                    getAssetsRecord()
                ])
            ).pipe(
                map(([tonPriceResponse, assetsRecord]) => {
                    const assetsWithRates = mapAssetsRecordWithExchangeRate(
                        tonPriceResponse.data.market_data.current_price.usd,
                        assetsRecord
                    );

                    return loadAssetsActions.success(assetsWithRates);
                }),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
