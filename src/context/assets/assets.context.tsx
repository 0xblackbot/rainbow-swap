import {createContext} from 'react';

import {offlineAssetList} from "../../assets/offline-asset-list.ts";
import {Asset} from '../../interfaces/asset.interface';
import {EMPTY_FN} from '../../utils/emptyfn';

interface Assets {
    outputAsset: Asset | undefined;
    setOutputAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
    inputAsset: Asset | undefined;
    setInputAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
    assets: Asset[];
    setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
    inputAssetAmount: string;
    setInputAssetAmount: React.Dispatch<React.SetStateAction<string>>;
}

export const AssetsContext = createContext<Assets>({
    outputAsset: undefined,
    setOutputAsset: EMPTY_FN,
    inputAsset: undefined,
    setInputAsset: EMPTY_FN,
    assets: offlineAssetList,
    setAssets: EMPTY_FN,
    inputAssetAmount: '',
    setInputAssetAmount: EMPTY_FN
});
