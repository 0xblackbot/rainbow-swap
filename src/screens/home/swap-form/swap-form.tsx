import {Address} from '@ton/core';
import {
    useTonAddress,
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
import {loadBalancesActions} from '../../../store/balances/balances-actions.ts';
import {loadSwapRoutesActions} from '../../../store/swap-routes/swap-routes-actions.ts';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {getSwapRouteMessage} from '../../../swap-routes/shared/message.utils.ts';
import {toNano} from '../../../utils/big-int.utils.ts';
import {getClassName} from '../../../utils/style.utils.ts';

export const SwapForm = () => {
    const wallet = useTonWallet();
    const walletAddress = useTonAddress();
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

    useEffect(() => {
        dispatch(
            loadBalancesActions.submit({
                walletAddress: walletAddress
            })
        );
    }, [dispatch, walletAddress]);

    const handleConnectWalletButtonClick = () => connectModal.open();
    const handleToggleAssetsClick = () => {
        setInputAsset(outputAsset);
        setOutputAsset(inputAsset);
    };
    const handleSwapButtonClick = async () => {
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
                        onClick={handleSwapButtonClick}
                        className={getClassName(
                            styles.body_button,
                            styles.swap_button
                        )}
                    />
                </>
            ) : (
                <FormButton
                    text="Connect Wallet"
                    type="button"
                    onClick={handleConnectWalletButtonClick}
                    className={getClassName(
                        styles.body_button,
                        styles.connect_button
                    )}
                />
            )}
        </>
    );
};
