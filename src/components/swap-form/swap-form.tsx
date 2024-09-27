import {useTonWallet} from '@tonconnect/ui-react';
import {Asset, getQueryId} from 'rainbow-swap-sdk';
import {useCallback, useEffect, useMemo, useRef} from 'react';

import {CustomInput} from './custom-input/custom-input';
import {CustomOutput} from './custom-input/custom-output';
import {FarmVolume} from './farm-volume/farm-volume';
import {useOutputAssetAmount} from './hooks/use-output-asset-amount.hook';
import {PendingSwap} from './pending-swap/pending-swap';
import {RateInfo} from './rate-info/rate-info';
import {SettingsButton} from './settings-button/settings-button';
import {SwapButton} from './swap-button/swap-button';
import {SwapDisabled} from './swap-disabled/swap-disabled';
import styles from './swap-form.module.css';
import {ToggleAssetsButton} from './toggle-assets-button/toggle-assets-button';
import {RefreshIcon} from '../../assets/icons/RefreshIcon/RefreshIcon';
import {useSwapForm} from '../../hooks/swap-form/swap-form.hook';
import {trackButtonClick} from '../../hooks/use-analytics.hook';
import {useOpenTonConnectModal} from '../../hooks/use-open-ton-connect-modal.hook';
import {useRefreshRoutes} from '../../hooks/use-refresh-routes.hook';
import {ContentContainer} from '../../shared/content-container/content-container';
import {FormButton} from '../../shared/form-button/form-button';
import {useDispatch} from '../../store';
import {useAppStatusSelector} from '../../store/security/security-selectors';
import {loadSwapRoutesActions} from '../../store/swap-routes/swap-routes-actions';
import {useRoutesSelector} from '../../store/swap-routes/swap-routes-selectors';
import {useBalancesSelector} from '../../store/wallet/wallet-selectors';
import {toNano} from '../../utils/big-int.utils';
import {formatNumber} from '../../utils/format-number.utils';
import {swapAssets} from '../../utils/swap-assets.utils';

export const SwapScreen = () => {
    const wallet = useTonWallet();
    const inputRef = useRef<HTMLInputElement>(null);
    const openTonConnectModal = useOpenTonConnectModal();

    const dispatch = useDispatch();
    const balances = useBalancesSelector();
    const routes = useRoutesSelector();
    const appStatus = useAppStatusSelector();

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
        dispatch(
            loadSwapRoutesActions.submit({
                inputAssetAmount: nanoInputAssetAmount,
                inputAssetAddress,
                outputAssetAddress,
                requestId: getQueryId().toString()
            })
        );
    }, [inputAssetAddress, outputAssetAddress, nanoInputAssetAmount, dispatch]);

    const handleConnectClick = useCallback(() => {
        trackButtonClick('Connect');
        inputRef.current?.blur();
        openTonConnectModal();
        // Connect modal constantly changes between re-renders causing this function to be recreated on every re-render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const handleToggleAssetsClick = useCallback(() => {
        trackButtonClick('Toggle Assets');
        setInputAssetAmount('');
        setInputAssetAddress(outputAssetAddress);
        setOutputAssetAddress(inputAssetAddress);
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }, [
        inputAssetAddress,
        outputAssetAddress,
        setInputAssetAddress,
        setInputAssetAmount,
        setOutputAssetAddress
    ]);
    const handleInputAssetValueChange = useCallback(
        (newValue: Asset) => {
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
        },
        [
            handleToggleAssetsClick,
            inputAssetAmount,
            outputAssetAddress,
            setInputAssetAddress,
            setInputAssetAmount
        ]
    );
    const handleOutputAssetValueChange = useCallback(
        (newValue: Asset) => {
            swapAssets(
                newValue.address,
                inputAssetAddress,
                setOutputAssetAddress,
                handleToggleAssetsClick
            );
        },
        [handleToggleAssetsClick, inputAssetAddress, setOutputAssetAddress]
    );
    const handleEnterSendAmount = useCallback(() => {
        trackButtonClick('Enter amount');
        inputRef.current?.focus();
    }, []);

    const handleSwap = useCallback(() => {
        trackButtonClick('Swap');
        inputRef.current?.blur();
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
                            balance={balances[outputAssetAddress]}
                            inputValue={outputAssetAmount}
                            assetValue={outputAsset}
                            onAssetValueChange={handleOutputAssetValueChange}
                        />
                    </div>
                    <RateInfo
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
                    {wallet ? (
                        Number(inputAssetAmount) === 0 ? (
                            <FormButton
                                text="Enter amount"
                                onClick={handleEnterSendAmount}
                            />
                        ) : (
                            <SwapButton onSwap={handleSwap} />
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
