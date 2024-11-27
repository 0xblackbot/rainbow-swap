import {TON} from '../globals';

export const swapAssets = (
    newAssetAddress: string,
    otherAssetAddress: string,
    setCurrentAssetAddress: (address: string) => void,
    handleToggleAssetsClick: () => void
) => {
    if (newAssetAddress === otherAssetAddress && newAssetAddress !== TON) {
        handleToggleAssetsClick();
    } else {
        setCurrentAssetAddress(newAssetAddress);
    }
};
