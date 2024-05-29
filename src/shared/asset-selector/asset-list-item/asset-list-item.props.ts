import {Asset} from '../../../interfaces/asset.interface.ts';

export interface AssetListItemProps {
    asset: Asset;
    balance: string;
    isSelected: boolean;
    onClick: () => void;
}
