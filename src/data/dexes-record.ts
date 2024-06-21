import {DexTypeEnum} from '../enums/dex-type.enum';
import {DexInfo} from '../interfaces/dex-info.interface';

export const DEFAULT_DEXES_RECORD: Record<DexTypeEnum, DexInfo> = {
    [DexTypeEnum.DeDust]: {
        name: 'DeDust',
        image: './dex-icons/dedust.png'
    },
    [DexTypeEnum.Ston]: {
        name: 'Ston',
        image: './dex-icons/ston.png'
    },
    [DexTypeEnum.DeDustStable]: {
        name: 'DeDustStable',
        image: './dex-icons/dedust.png'
    }
};
