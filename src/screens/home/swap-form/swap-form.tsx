import {Address} from '@ton/core';
import {
    useTonConnectModal,
    useTonConnectUI,
    useTonWallet
} from '@tonconnect/ui-react';
import {useEffect, useState} from 'react';

import styles from './swap-form.module.css';
import {ToggleAssetsButton} from './toggle-assets-button/toggle-assets-button.tsx';
import {DEFAULT_ASSETS_RECORD} from '../../../data/assets-record.ts';
import {TON, USDT} from '../../../globals.ts';
import {CustomInput} from '../../../shared/CustomInput/CustomInput.tsx';
import {FormButton} from '../../../shared/FormButton/FormButton.tsx';
import {useDispatch} from '../../../store';
import {loadSwapRoutesActions} from '../../../store/swap-routes/swap-routes-actions.ts';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {getSwapRouteMessage} from '../../../swap-routes/shared/message.utils.ts';
import {toNano} from '../../../utils/big-int.utils.ts';

export const SwapForm = () => {
    const wallet = useTonWallet();
    const connectModal = useTonConnectModal();
    const [tonConnectUI] = useTonConnectUI();

    const dispatch = useDispatch();
    const swapRoutes = useSwapRoutesSelector();

    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [inputAsset, setInputAsset] = useState(DEFAULT_ASSETS_RECORD[TON]);
    const [outputAsset, setOutputAsset] = useState(DEFAULT_ASSETS_RECORD[USDT]);

    useEffect(() => {
        if (inputAssetAmount === '') {
            dispatch(loadSwapRoutesActions.success([]));
        } else {
            dispatch(
                loadSwapRoutesActions.submit({
                    inputAssetAmount: toNano(
                        inputAssetAmount,
                        inputAsset.decimals
                    ).toString(),
                    inputAssetAddress: inputAsset.address,
                    outputAssetAddress: outputAsset.address
                })
            );
        }
    }, [inputAssetAmount, inputAsset, outputAsset, dispatch]);

    const handleConnectClick = () => connectModal.open();
    const handleToggleAssetsClick = () => {
        setInputAsset(outputAsset);
        setOutputAsset(inputAsset);
    };
    const handleSwapClick = async () => {
        const senderAddress = wallet?.account.address ?? '';

        const messages = await Promise.all(
            swapRoutes.map(swapRoute =>
                getSwapRouteMessage(swapRoute, Address.parse(senderAddress))
            )
        );

        tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
            from: senderAddress,
            messages
        });
    };

    return (
        <>
            <div className={styles.body_div}>
                <CustomInput
                    label="You pay"
                    isInputEnabled={true}
                    inputValue={inputAssetAmount}
                    assetValue={inputAsset}
                    onInputValueChange={setInputAssetAmount}
                    onAssetValueChange={setInputAsset}
                />
                <ToggleAssetsButton onClick={handleToggleAssetsClick} />
                <CustomInput
                    label="You receive"
                    isInputEnabled={false}
                    inputValue={''}
                    assetValue={outputAsset}
                    onAssetValueChange={setOutputAsset}
                />
            </div>

            {wallet ? (
                <>
                    <FormButton
                        text="Swap"
                        type="button"
                        onClick={handleSwapClick}
                        className={styles.body_button}
                    />
                </>
            ) : (
                <FormButton
                    text="Connect Wallet"
                    type="button"
                    onClick={handleConnectClick}
                    className={styles.body_button}
                />
            )}
        </>
    );
};
