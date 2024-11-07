import axios from 'axios';
import {useEffect} from 'react';
import ReactGA from 'react-ga4';

import {INIT_DATA, isProd} from '../globals';

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

const API = axios.create({
    baseURL: 'https://api.rainbow.ag/analytics'
});

export const trackSwapConfirmation = (params: {
    walletAddress: string;
    bocHash: string;
    usdValue: number;
    inputAssetAddress: string;
    inputAssetSymbol: string;
    inputAssetAmount: number;
    outputAssetAddress: string;
    outputAssetSymbol: string;
    outputAssetAmount: number;
}) =>
    API.post('/track-event', {
        initData: INIT_DATA,
        type: 'swap-confirmed',
        ...params
    });
