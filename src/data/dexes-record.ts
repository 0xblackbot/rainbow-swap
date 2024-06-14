import {DexTypeEnum} from '../enums/dex-type.enum';
import {DexInfo} from '../interfaces/dex-info.interface';

export const DEFAULT_DEXES_RECORD: Record<DexTypeEnum, DexInfo> = {
    [DexTypeEnum.DeDust]: {
        name: 'DeDust',
        image: 'https://files.readme.io/681e2e6-dedust_1.png'
    },
    [DexTypeEnum.Ston]: {
        name: 'Ston',
        image: 'https://ton.app/media/0f34939b-44b1-4be6-9ac1-2f97d61655d4.png?w=640&q=50'
    },
    [DexTypeEnum.DeDustStable]: {
        name: 'DeDustStable',
        image: 'https://files.readme.io/681e2e6-dedust_1.png'
    }
};
