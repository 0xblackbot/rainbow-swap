export interface OnchainSwap {
    walletAddress: string;
    timestamp: number;
    bocHash: string;

    inputAssetAddress: string;
    nanoInputAssetAmount: string;
    outputAssetAddress: string | undefined;
    nanoOutputAssetAmount: string;

    successNanoInputAssetAmount: string;
    successUsdValue: number;
    successTonFee: string;
    refundTonFee: string;
    tonFeeRefText?: string;
    failedAssetsRecord: Record<string, string>;
}
