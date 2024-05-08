import {createContext} from 'react';

import {AssetObject} from '../interfaces/asset-object.interface';
import {EMPTY_FN} from '../utils/emptyfn';

interface InputOutputValues {
    modalInputOpen: boolean;
    setInputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    modalOutputOpen: boolean;
    setOutputModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    outputAsset: AssetObject | undefined;
    setOutputAsset: React.Dispatch<
        React.SetStateAction<AssetObject | undefined>
    >;
    inputAsset: AssetObject | undefined;
    setInputAsset: React.Dispatch<
        React.SetStateAction<AssetObject | undefined>
    >;
    assets: AssetObject[];
    setAssets: React.Dispatch<React.SetStateAction<AssetObject[]>>;
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
    setAssets: EMPTY_FN
});
