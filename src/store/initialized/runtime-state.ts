export interface RuntimeState {
    isAssetsInitialized: boolean;
    assetsSearchValue: string;
}

export const initializedInitialState: RuntimeState = {
    isAssetsInitialized: false,
    assetsSearchValue: ''
};
