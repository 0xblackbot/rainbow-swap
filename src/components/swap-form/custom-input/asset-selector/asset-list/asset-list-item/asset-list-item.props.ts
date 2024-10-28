import {Asset} from 'rainbow-swap-sdk';

export interface AssetListItemProps {
    dataArray: {
        asset: Asset;
        balance: string;
        onClick: () => void;
    }[];
}
