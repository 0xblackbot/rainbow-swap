import {TON, USDT} from '../globals';

const AquaUSD = 'EQAWDyxARSl3ol2G1RMLMwepr3v6Ter5ls3jiAlheKshgg0K';
const wsTON = 'EQB0SoxuGDx5qjVt0P_bPICFeWdFLBmVopHhjgfs0q-wsTON';
const DONE = 'EQCgGUMB_u1Gkrskw2o407Ig8ymQmfkxWuPW2d4INuQoPFJO';
const stTON = 'EQDNhy-nxYFgUqzfUzImBEP67JqsyMIcyk2S5_RwNNEYku0k';
const hTON = 'EQDPdq8xjAhytYqfGSX8KcFWIReCufsB9Wdg0pLlYSO_h76w';

const FEE_FREE_PAIRS = [
    [AquaUSD, USDT],
    [TON, wsTON],
    [DONE, USDT],
    [TON, stTON],
    [TON, hTON]
];

export const isTolFeePromo = (
    inputAssetAddress: string,
    outputAssetAddress: string
) =>
    inputAssetAddress !== outputAssetAddress &&
    FEE_FREE_PAIRS.some(
        pair =>
            pair.includes(inputAssetAddress) &&
            pair.includes(outputAssetAddress)
    );
