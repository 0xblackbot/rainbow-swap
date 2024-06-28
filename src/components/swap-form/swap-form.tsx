import {useTonConnectModal, useTonWallet} from '@tonconnect/ui-react';
import {useCallback, useEffect, useMemo, useRef} from 'react';

import {CustomInput} from './custom-input/custom-input';
import {useOutputAssetAmount} from './hooks/use-output-asset-amount.hook';
import {useSwapInfo} from './hooks/use-swap-info.hook';
import {SettingsButton} from './settings-button/settings-button';
import {SwapButton} from './swap-button/swap-button';
import styles from './swap-form.module.css';
import {ToggleAssetsButton} from './toggle-assets-button/toggle-assets-button';
import {RefreshIcon} from '../../assets/icons/RefreshIcon/RefreshIcon';
import {useSwapForm} from '../../hooks/swap-form/swap-form.hook';
import {useAnalytics} from '../../hooks/use-analytics.hook';
import {useRefreshRoutes} from '../../hooks/use-refresh-routes.hook';
import {Asset} from '../../interfaces/asset.interface';
import {ContentContainer} from '../../shared/content-container/content-container';
import {FormButton} from '../../shared/form-button/form-button';
import {useAssetsRecordSelector} from '../../store/assets/assets-selectors';
import {useDispatch} from '../../store/index';
import {useSlippageToleranceSelector} from '../../store/settings/settings-selectors';
import {loadSwapRoutesActions} from '../../store/swap-routes/swap-routes-actions';
import {useSwapRoutesSelector} from '../../store/swap-routes/swap-routes-selectors';
import {useBalancesSelector} from '../../store/wallet/wallet-selectors';
import {mapSwapRouteToRoute} from '../../swap-routes/shared/calculated-swap-route.utils';
import {toNano} from '../../utils/big-int.utils';
import {formatNumber} from '../../utils/format-number.utils';
import {swapAssets} from '../../utils/swap-assets.utils';

export const SwapScreen = () => {
    const wallet = useTonWallet();
    const inputRef = useRef<HTMLInputElement>(null);
    const connectModal = useTonConnectModal();

    const dispatch = useDispatch();
    const {trackButtonClick} = useAnalytics();
    const assets = useAssetsRecordSelector();
    const slippageTolerance = useSlippageToleranceSelector();
    const swapRoutes = useSwapRoutesSelector();
    const isLoading = swapRoutes.isLoading;
    const balances = useBalancesSelector();
    const routes = useMemo(
        () => swapRoutes.data.map(mapSwapRouteToRoute),
        [swapRoutes]
    );

    const {
        inputAssetAddress,
        setInputAssetAddress,
        outputAssetAddress,
        setOutputAssetAddress,
        inputAssetAmount,
        setInputAssetAmount
    } = useSwapForm();

    const inputAsset = assets[inputAssetAddress];
    const outputAsset = assets[outputAssetAddress];

    const swapInfo = useSwapInfo(
        inputAsset.decimals,
        outputAsset.decimals,
        slippageTolerance,
        routes
    );

    const outputAssetAmount = useOutputAssetAmount(
        routes,
        outputAsset.decimals
    );

    const nanoInputAssetAmount = useMemo(
        () =>
            inputAssetAmount === ''
                ? '0'
                : toNano(inputAssetAmount, inputAsset.decimals).toString(),
        [inputAssetAmount, inputAsset.decimals]
    );

    const {intervalRef, handleManualRefresh} = useRefreshRoutes(
        inputAssetAmount,
        nanoInputAssetAmount,
        inputAssetAddress,
        outputAssetAddress
    );

    useEffect(() => {
        if (nanoInputAssetAmount === '0') {
            dispatch(loadSwapRoutesActions.success([]));
        } else {
            dispatch(
                loadSwapRoutesActions.submit({
                    inputAssetAmount: nanoInputAssetAmount,
                    inputAssetAddress,
                    outputAssetAddress
                })
            );
        }
    }, [inputAssetAddress, outputAssetAddress, nanoInputAssetAmount, dispatch]);

    const handleConnectClick = useCallback(() => {
        trackButtonClick('Connect');
        inputRef.current?.blur();
        connectModal.open();
        // Connect modal constantly changes between re-renders causing this function to be recreated on every re-render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
    }, [trackButtonClick]);

    const handleSwap = useCallback(() => {
        trackButtonClick('Swap');
        inputRef.current?.blur();
    }, [trackButtonClick]);

    return (
        <>
            <ContentContainer>
                <div className={styles.body_div}>
                    <div className={styles.swapform_header}>
                        <p />
                        <div className={styles.icons_div}>
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
                            label="You send"
                            assetSelectorHeaderTitle="Select input asset"
                            balance={balances[inputAssetAddress]}
                            isInputEnabled={true}
                            inputValue={inputAssetAmount}
                            onInputValueChange={setInputAssetAmount}
                            assetValue={inputAsset}
                            onAssetValueChange={handleInputAssetValueChange}
                        />
                        <ToggleAssetsButton onClick={handleToggleAssetsClick} />
                    </div>
                    <div className={styles.output_asset_container}>
                        <CustomInput
                            label="You receive"
                            assetSelectorHeaderTitle="Select output asset"
                            balance={balances[outputAssetAddress]}
                            isInputEnabled={false}
                            inputValue={outputAssetAmount}
                            assetValue={outputAsset}
                            isLoading={isLoading}
                            onAssetValueChange={handleOutputAssetValueChange}
                        />
                    </div>
                    <div className={styles.rate_div}>
                        {inputAssetAmount.length !== 0 && !isLoading
                            ? routes.length > 0
                                ? `1 ${inputAsset.symbol} = ${formatNumber(swapInfo.exchangeRate, 5)} ${outputAsset.symbol}`
                                : 'No routes available'
                            : null}
                    </div>
                    {wallet ? (
                        Number(inputAssetAmount) === 0 ? (
                            <FormButton
                                text="Enter amount"
                                onClick={handleEnterSendAmount}
                            />
                        ) : (
                            <SwapButton
                                onSwap={handleSwap}
                                outputAssetAmount={outputAssetAmount}
                            />
                        )
                    ) : (
                        <FormButton
                            text="Connect Wallet"
                            onClick={handleConnectClick}
                        />
                    )}
                </div>
            </ContentContainer>
        </>
    );
};
