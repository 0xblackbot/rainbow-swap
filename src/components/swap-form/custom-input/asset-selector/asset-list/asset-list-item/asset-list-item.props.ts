import {Asset} from 'rainbow-swap-sdk';

export interface AssetListItemProps {
    asset: Asset;
    balance: string;
    isSelected: boolean;
    onClick: () => void;
}
