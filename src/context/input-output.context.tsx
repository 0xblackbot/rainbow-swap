import {createContext} from 'react';

import {Asset} from '../interfaces/asset.interface';
import {EMPTY_FN} from '../utils/emptyfn';

interface InputOutputValues {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    outputAsset: Asset | undefined;
    setOutputAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
    inputAsset: Asset | undefined;
    setInputAsset: React.Dispatch<React.SetStateAction<Asset | undefined>>;
    assets: Asset[];
    setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
    inputAssetAmount: string;
    setInputAssetAmount: React.Dispatch<React.SetStateAction<string>>;
}

export const InputOutputContext = createContext<InputOutputValues>({
    modalInputOpen: false,
    setInputModalOpen: EMPTY_FN,
    modalOutputOpen: false,
    setOutputModalOpen: EMPTY_FN,
    outputAsset: undefined,
    setOutputAsset: EMPTY_FN,
    inputAsset: undefined,
    setInputAsset: EMPTY_FN,
    assets: [],
    setAssets: EMPTY_FN,
    inputAssetAmount: '',
    setInputAssetAmount: EMPTY_FN
});
