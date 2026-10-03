export interface RuntimeState {
    rainbowWithdrawalApprovalOwner: string | null;
    isAssetsInitialized: boolean;
    assetsSearchValue: string;
}

export const initializedInitialState: RuntimeState = {
    rainbowWithdrawalApprovalOwner: null,
    isAssetsInitialized: false,
    assetsSearchValue: ''
};
