import {Asset} from 'rainbow-swap-sdk';

export interface AssetListItemProps {
    isLoading: boolean;
    dataArray: {
        asset: Asset;
        balance: string;
        onClick: () => void;
    }[];
}
