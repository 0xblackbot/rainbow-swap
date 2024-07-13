import {useEffect} from 'react';
import ReactGA from 'react-ga4';

import {isProd} from '../globals';
import {Asset} from '../interfaces/asset.interface';

export const useTrackPageView = (name: string, isOpen = true) =>
    useEffect(() => {
        if (isProd && isOpen) {
            ReactGA.send({
                hitType: 'pageview',
                page: '/' + name.toLowerCase().replace(/\s+/g, '-'),
                title: name
            });
        }
    }, [name, isOpen]);

export const trackButtonClick = (name: string) =>
    isProd &&
    ReactGA.event({
        category: 'General',
        action: 'Clicked ' + name,
        label: name
    });

export const trackSwapConfirmation = (
    bocHash: string,
    usdValue: number,
    inputAsset: Asset,
    outputAsset: Asset,
    outputAssetAmount: number
) => {
    if (isProd) {
        ReactGA.gtag('event', 'purchase', {
            transaction_id: bocHash,
            value: usdValue,
            currency: 'USD',
            items: [
                {
                    item_id: `${inputAsset.address}_${outputAsset.address}`,
                    item_name: `${inputAsset.symbol} - ${outputAsset.symbol}`,
                    item_category: 'output_asset',
                    price: usdValue,
                    quantity: outputAssetAmount
                }
            ]
        });
    }
};
