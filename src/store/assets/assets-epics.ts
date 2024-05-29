import {combineEpics} from 'redux-observable';
import {catchError, from, map, Observable, of, switchMap} from 'rxjs';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {loadAssetsActions} from './assets-actions';
import {API, COIN_GECKO_API} from '../../globals';
import {AssetsRecord} from '../../types/assets-record.type';
import {getUsdExchangeRate} from '../../utils/get-usd-value.utils';

const TON_COINGECKO_ID = 'the-open-network';

const loadAssetsEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadAssetsActions.submit),
        switchMap(() =>
            from(COIN_GECKO_API.get(`/coins/${TON_COINGECKO_ID}`)).pipe(
                switchMap(tonPriceResponse =>
                    from(API.get<AssetsRecord>('/assets-record')).pipe(
                        map(assetsResponse => {
                            const tonPrice =
                                tonPriceResponse.data.market_data.current_price
                                    .usd;

                            for (const asset of Object.values(
                                assetsResponse.data
                            )) {
                                asset.exchangeRate = getUsdExchangeRate(
                                    tonPrice,
                                    asset
                                ).toString();
                            }

                            return loadAssetsActions.success(
                                assetsResponse.data
                            );
                        })
                    )
                ),
                catchError(err => of(loadAssetsActions.fail(err.message)))
            )
        )
    );

export const assetsEpics = combineEpics(loadAssetsEpic);
