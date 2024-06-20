import {Asset} from '../../../../../interfaces/asset.interface';

export interface AssetListItemProps {
    asset: Asset;
    balance: string;
    isSelected: boolean;
    onClick: () => void;
}
