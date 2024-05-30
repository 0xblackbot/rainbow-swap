import {useTonConnectModal, useTonWallet} from '@tonconnect/ui-react';
import {useEffect, useMemo, useRef} from 'react';

import {useOutputAssetAmount} from './hooks/use-output-asset-amount.hook.ts';
import {SwapButton} from './swap-button/swap-button.tsx';
import styles from './swap-form.module.css';
import {ToggleAssetsButton} from './toggle-assets-button/toggle-assets-button.tsx';
import {ContentContainer} from '../../../components/content-container/content-container.tsx';
import {useSwapForm} from '../../../hooks/swap-form/swap-form.hook.ts';
import {CustomInput} from '../../../shared/CustomInput/CustomInput.tsx';
import {FormButton} from '../../../shared/FormButton/FormButton.tsx';
import {useDispatch} from '../../../store';
import {useAssetsRecordSelector} from '../../../store/assets/assets-selectors.ts';
import {loadSwapRoutesActions} from '../../../store/swap-routes/swap-routes-actions.ts';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {useBalancesSelector} from '../../../store/wallet/wallet-selectors.ts';
import {mapSwapRouteToRoute} from '../../../swap-routes/shared/calculated-swap-route.utils.ts';
import {toNano} from '../../../utils/big-int.utils.ts';

export const SwapScreen = () => {
    const wallet = useTonWallet();
    const inputRef = useRef<HTMLInputElement>(null);
    const connectModal = useTonConnectModal();

    const dispatch = useDispatch();
    const assets = useAssetsRecordSelector();
    const swapRoutes = useSwapRoutesSelector();
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

    const outputAssetAmount = useOutputAssetAmount(
        routes,
        assets[outputAssetAddress].decimals
    );

    const inputAssetDecimals = assets[inputAssetAddress].decimals;

    const nanoInputAssetAmount = useMemo(() => {
        if (inputAssetAmount === '') {
            return '';
        }
        return toNano(inputAssetAmount, inputAssetDecimals).toString();
    }, [inputAssetAmount, inputAssetDecimals]);

    useEffect(() => {
        if (nanoInputAssetAmount === '') {
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

    const handleConnectClick = () => connectModal.open();
    const handleToggleAssetsClick = () => {
        setInputAssetAmount('');
        setInputAssetAddress(outputAssetAddress);
        setOutputAssetAddress(inputAssetAddress);
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    };

    const handleEnterSendAmount = () => inputRef.current?.focus();
    const handleSwap = () => inputRef.current?.blur();

    return (
        <>
            <ContentContainer>
                <div className={styles.body_div}>
                    <div className={styles.input_asset_container}>
                        <CustomInput
                            label="You send"
                            isInputEnabled={true}
                            inputValue={inputAssetAmount}
                            assetAddressValue={inputAssetAddress}
                            balance={balances[inputAssetAddress]}
                            onInputValueChange={setInputAssetAmount}
                            onAssetValueChange={setInputAssetAddress}
                        />
                        <ToggleAssetsButton onClick={handleToggleAssetsClick} />
                    </div>
                    <div className={styles.output_asset_container}>
                        <CustomInput
                            label="You receive"
                            isInputEnabled={false}
                            inputValue={outputAssetAmount}
                            assetAddressValue={outputAssetAddress}
                            balance={balances[outputAssetAddress]}
                            onAssetValueChange={setOutputAssetAddress}
                        />
                    </div>

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
