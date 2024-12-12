import {AppStatus, Asset, getQueryId} from 'rainbow-swap-sdk';
import {useCallback, useEffect, useMemo, useRef} from 'react';

import {AdsSwiperWithSuspense} from './ads-swiper/ads-swiper-with-suspense';
import {ConnectWalletButton} from './connect-wallet-button/connect-wallet-button';
import {CustomInput} from './custom-input/custom-input';
import {CustomOutput} from './custom-input/custom-output';
import {useInputError} from './hooks/use-input-error.hook';
import {PendingSwap} from './pending-swap/pending-swap';
import {SwapButton} from './swap-button/swap-button';
import {SwapDetails} from './swap-details/swap-details';
import {SwapDisabled} from './swap-disabled/swap-disabled';
import styles from './swap-form.module.css';
import {ToggleAssetsButton} from './toggle-assets-button/toggle-assets-button';
import {RefreshIcon} from '../../assets/icons/RefreshIcon/RefreshIcon';
import {useSwapForm} from '../../contexts/swap-form/swap-form.hook';
import {trackButtonClick} from '../../hooks/use-analytics.hook';
import {useIsMainButtonAvailable} from '../../hooks/use-is-main-button-available.hook';
import {useRefreshRoutes} from '../../hooks/use-refresh-routes.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {ContentContainer} from '../../shared/content-container/content-container';
import {FormButton} from '../../shared/form-button/form-button';
import {useDispatch} from '../../store';
import {useIsAssetsInitializedSelector} from '../../store/initialized/runtime-selectors';
import {
    useMaxSplitsSelector,
    useRiskToleranceSelector
} from '../../store/settings/settings-selectors';
import {loadSwapRoutesActions} from '../../store/swap-routes/swap-routes-actions';
import {
    useIsRoutesLoadingSelector,
    useSwapDisplayDataSelector
} from '../../store/swap-routes/swap-routes-selectors';
import {toNano} from '../../utils/big-int.utils';
import {formatNumber} from '../../utils/format-number.utils';
import {swapAssets} from '../../utils/swap-assets.utils';

export const SwapScreen = () => {
    const walletAddress = useWalletAddress();
    const inputRef = useRef<HTMLInputElement>(null);
    const isMainButtonAvailable = useIsMainButtonAvailable();

    const dispatch = useDispatch();
    const appStatus: AppStatus = {
        isSwapsEnabled: false,
        message: 'some text'
    };
    const isAssetsInitialized = useIsAssetsInitializedSelector();
    const swapDisplayData = useSwapDisplayDataSelector();
    const riskTolerance = useRiskToleranceSelector();
    const maxSplits = useMaxSplitsSelector();
    const isRoutesLoading = useIsRoutesLoadingSelector();

    const {
        inputAssetAddress,
        setInputAssetAddress,
        outputAssetAddress,
        setOutputAssetAddress,
        inputAssetAmount,
        setInputAssetAmount,
        inputAsset,
        outputAsset
    } = useSwapForm();

    const isValidInputAssetAmount = Number(inputAssetAmount) !== 0;

    const nanoInputAssetAmount = useMemo(
        () =>
            inputAssetAmount === ''
                ? '0'
                : toNano(inputAssetAmount, inputAsset.decimals).toString(),
        [inputAssetAmount, inputAsset.decimals]
    );

    const inputError = useInputError();

    const outputAssetAmount =
        swapDisplayData.outputAssetAmount === 0
            ? ''
            : swapDisplayData.outputAssetAmount.toString();

    const {intervalRef, handleManualRefresh} = useRefreshRoutes(
        inputAssetAmount,
        nanoInputAssetAmount,
        inputAssetAddress,
        outputAssetAddress,
        riskTolerance,
        maxSplits
    );

    useEffect(() => {
        dispatch(
            loadSwapRoutesActions.submit({
                inputAssetAmount: nanoInputAssetAmount,
                inputAssetAddress,
                outputAssetAddress,
                senderAddress: walletAddress,
                riskTolerance,
                maxSplits,
                requestId: getQueryId().toString()
            })
        );
    }, [
        walletAddress,
        inputAssetAddress,
        outputAssetAddress,
        nanoInputAssetAmount,
        riskTolerance,
        maxSplits,
        dispatch
    ]);

    const handleConnectClick = useCallback(() => inputRef.current?.blur(), []);
    const handleToggleAssetsClick = () => {
        trackButtonClick('Toggle Assets');
        setInputAssetAmount('');
        setInputAssetAddress(outputAssetAddress);
        setOutputAssetAddress(inputAssetAddress);
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    };
    const handleInputAssetValueChange = (newValue: Asset) => {
        swapAssets(
            newValue.address,
            outputAssetAddress,
            setInputAssetAddress,
            handleToggleAssetsClick
        );
        if (inputAssetAmount !== '') {
            const valueAmount = formatNumber(
                Number(inputAssetAmount),
                newValue.decimals
            );
            setInputAssetAmount(valueAmount);
        }
    };
    const handleOutputAssetValueChange = (newValue: Asset) => {
        swapAssets(
            newValue.address,
            inputAssetAddress,
            setOutputAssetAddress,
            handleToggleAssetsClick
        );
    };
    const handleEnterSendAmount = useCallback(() => {
        trackButtonClick('Enter amount');
        inputRef.current?.focus();
    }, []);

    return (
        <>
            <ContentContainer>
                <div className={styles.body_div}>
                    <div className={styles.swapform_header}>
                        <p className={styles.error_text}>
                            {!isRoutesLoading && inputError}
                        </p>
                        <div className={styles.icons_div}>
                            <PendingSwap />
                            {isValidInputAssetAmount && (
                                <RefreshIcon
                                    width="22px"
                                    height="22px"
                                    onClick={handleManualRefresh}
                                    isAnimating={intervalRef.current !== null}
                                />
                            )}
                        </div>
                    </div>
                    <div className={styles.input_asset_container}>
                        <CustomInput
                            ref={inputRef}
                            inputValue={inputAssetAmount}
                            onInputValueChange={setInputAssetAmount}
                            assetValue={inputAsset}
                            onAssetValueChange={handleInputAssetValueChange}
                            isError={!!inputError}
                            isLoading={!isAssetsInitialized}
                            inputValueUsdAmount={
                                swapDisplayData.inputAssetUsdAmount
                            }
                        />
                        <ToggleAssetsButton onClick={handleToggleAssetsClick} />
                    </div>
                    <div className={styles.output_asset_container}>
                        <CustomOutput
                            inputValue={outputAssetAmount}
                            assetValue={outputAsset}
                            onAssetValueChange={handleOutputAssetValueChange}
                            isLoading={!isAssetsInitialized}
                            inputValueUsdAmount={
                                swapDisplayData.outputAssetUsdAmount
                            }
                        />
                    </div>
                    {walletAddress ? (
                        isValidInputAssetAmount ? (
                            <SwapButton
                                inputAsset={inputAsset}
                                outputAsset={outputAsset}
                            />
                        ) : (
                            <FormButton
                                text="Enter amount"
                                onClick={handleEnterSendAmount}
                            />
                        )
                    ) : (
                        <ConnectWalletButton onClick={handleConnectClick} />
                    )}
                    {!isMainButtonAvailable && (
                        <div className={styles.ident_container} />
                    )}

                    <SwapDetails
                        isValidInputAssetAmount={isValidInputAssetAmount}
                        inputAsset={inputAsset}
                        outputAsset={outputAsset}
                    />
                    {appStatus.isSwapsEnabled ? (
                        <AdsSwiperWithSuspense />
                    ) : (
                        <SwapDisabled message={appStatus.message} />
                    )}
                </div>
            </ContentContainer>
        </>
    );
};
