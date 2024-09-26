import {DexTypeEnum} from 'rainbow-swap-sdk';

import {DexInfo} from '../interfaces/dex-info.interface';

export const DEFAULT_DEXES_RECORD: Record<DexTypeEnum, DexInfo> = {
    [DexTypeEnum.DeDust]: {
        name: 'DeDust',
        image: './dex-icons/dedust.png'
    },
    [DexTypeEnum.DeDustStable]: {
        name: 'DeDust',
        image: './dex-icons/dedust.png'
    },
    [DexTypeEnum.Ston]: {
        name: 'Ston',
        image: './dex-icons/ston.png'
    },
    [DexTypeEnum.Ston_v2]: {
        name: 'Ston',
        image: './dex-icons/ston.png'
    }
};
