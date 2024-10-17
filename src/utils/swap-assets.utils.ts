export const swapAssets = (
    newAssetAddress: string,
    otherAssetAddress: string,
    setCurrentAssetAddress: (address: string) => void,
    handleToggleAssetsClick: () => void
) => {
    if (newAssetAddress === otherAssetAddress) {
        handleToggleAssetsClick();
    } else {
        setCurrentAssetAddress(newAssetAddress);
    }
};
