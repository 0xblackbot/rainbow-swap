import {Asset, getQueryId} from 'rainbow-swap-sdk';
import {useCallback, useEffect, useMemo, useRef} from 'react';

import {ConnectWalletButton} from './connect-wallet-button/connect-wallet-button';
import {CustomInput} from './custom-input/custom-input';
import {CustomOutput} from './custom-input/custom-output';
import {FarmVolume} from './farm-volume/farm-volume';
import {useSwapInfo} from './hooks/use-swap-info.hook';
import {PendingSwap} from './pending-swap/pending-swap';
import {SettingsButton} from './settings-button/settings-button';
import {SwapButton} from './swap-button/swap-button';
import {SwapDetails} from './swap-details/swap-details';
import {SwapDisabled} from './swap-disabled/swap-disabled';
import styles from './swap-form.module.css';
import {ToggleAssetsButton} from './toggle-assets-button/toggle-assets-button';
import {RefreshIcon} from '../../assets/icons/RefreshIcon/RefreshIcon';
import {IS_MAIN_BUTTON_AVAILABLE} from '../../globals';
import {useSwapForm} from '../../hooks/swap-form/swap-form.hook';
import {trackButtonClick} from '../../hooks/use-analytics.hook';
import {useRefreshRoutes} from '../../hooks/use-refresh-routes.hook';
import {useWalletAddress} from '../../hooks/use-wallet-address.hook';
import {ContentContainer} from '../../shared/content-container/content-container';
import {FormButton} from '../../shared/form-button/form-button';
import {useDispatch} from '../../store';
import {useIsAssetInitializedSelector} from '../../store/initialized/initialized-selectors';
import {useAppStatusSelector} from '../../store/security/security-selectors';
import {useMaxSlippageSelector} from '../../store/settings/settings-selectors';
import {loadSwapRoutesActions} from '../../store/swap-routes/swap-routes-actions';
import {useRoutesSelector} from '../../store/swap-routes/swap-routes-selectors';
import {useBalancesSelector} from '../../store/wallet/wallet-selectors';
import {toNano} from '../../utils/big-int.utils';
import {formatNumber} from '../../utils/format-number.utils';
import {swapAssets} from '../../utils/swap-assets.utils';

export const SwapScreen = () => {
    const walletAddress = useWalletAddress();
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch();
    const balances = useBalancesSelector();
    const routes = useRoutesSelector();
    const appStatus = useAppStatusSelector();
    const slippageTolerance = useMaxSlippageSelector();
    const isAssetInitialized = useIsAssetInitializedSelector();

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

    const nanoInputAssetAmount = useMemo(
        () =>
            inputAssetAmount === ''
                ? '0'
                : toNano(inputAssetAmount, inputAsset.decimals).toString(),
        [inputAssetAmount, inputAsset.decimals]
    );

    const swapInfo = useSwapInfo(
        inputAsset.decimals,
        outputAsset.decimals,
        slippageTolerance,
        routes
    );

    const outputAssetAmount =
        swapInfo.outputAssetAmount === '0' ? '' : swapInfo.outputAssetAmount;

    const {intervalRef, handleManualRefresh} = useRefreshRoutes(
        inputAssetAmount,
        nanoInputAssetAmount,
        inputAssetAddress,
        outputAssetAddress
    );

    useEffect(() => {
        dispatch(
            loadSwapRoutesActions.submit({
                inputAssetAmount: nanoInputAssetAmount,
                inputAssetAddress,
                outputAssetAddress,
                senderAddress: walletAddress,
                requestId: getQueryId().toString()
            })
        );
    }, [
        walletAddress,
        inputAssetAddress,
        outputAssetAddress,
        nanoInputAssetAmount,
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
                        <p />
                        <div className={styles.icons_div}>
                            <PendingSwap />
                            <RefreshIcon
                                width="22px"
                                height="22px"
                                onClick={handleManualRefresh}
                                isAnimating={intervalRef.current !== null}
                            />
                            <SettingsButton />
                        </div>
                    </div>
                    <div className={styles.input_asset_container}>
                        <CustomInput
                            ref={inputRef}
                            isLoading={!isAssetInitialized}
                            balance={balances[inputAssetAddress]}
                            inputValue={inputAssetAmount}
                            onInputValueChange={setInputAssetAmount}
                            assetValue={inputAsset}
                            onAssetValueChange={handleInputAssetValueChange}
                        />
                        <ToggleAssetsButton onClick={handleToggleAssetsClick} />
                    </div>
                    <div className={styles.output_asset_container}>
                        <CustomOutput
                            isLoading={!isAssetInitialized}
                            balance={balances[outputAssetAddress]}
                            inputValue={outputAssetAmount}
                            assetValue={outputAsset}
                            onAssetValueChange={handleOutputAssetValueChange}
                        />
                    </div>
                    {walletAddress ? (
                        Number(inputAssetAmount) === 0 ? (
                            <FormButton
                                text="Enter amount"
                                onClick={handleEnterSendAmount}
                            />
                        ) : (
                            <SwapButton
                                swapInfo={swapInfo}
                                inputAsset={inputAsset}
                                outputAsset={outputAsset}
                            />
                        )
                    ) : (
                        <ConnectWalletButton onClick={handleConnectClick} />
                    )}
                    {!IS_MAIN_BUTTON_AVAILABLE && (
                        <div className={styles.ident_container} />
                    )}

                    <SwapDetails
                        swapInfo={swapInfo}
                        inputAsset={inputAsset}
                        outputAsset={outputAsset}
                        inputAssetAmount={inputAssetAmount}
                        routes={routes}
                    />
                    {appStatus.isSwapsEnabled ? (
                        <FarmVolume />
                    ) : (
                        <SwapDisabled message={appStatus.message} />
                    )}
                </div>
            </ContentContainer>
        </>
    );
};
