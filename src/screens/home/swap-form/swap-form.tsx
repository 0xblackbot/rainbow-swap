import {Address} from '@ton/core';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useState} from 'react';

import {DEFAULT_ASSETS_RECORD} from '../../../data/assets-record.ts';
import {TON, USDT} from '../../../globals.ts';
import {CustomInput} from '../../../shared/CustomInput/CustomInput.tsx';
import {FormButton} from '../../../shared/FormButton/FormButton.tsx';
import {InputOutputSelector} from '../../../shared/InputOutputSelector/InputOutputSelector.tsx';
import {useSwapRoutesSelector} from '../../../store/swap-routes/swap-routes-selectors.ts';
import {getSwapRouteMessage} from '../../../swap-routes/shared/message.utils.ts';
import {getClassName} from '../../../utils/style.utils.ts';
import styles from '../home.module.css';

export const SwapForm = () => {
    const [tonConnectUI] = useTonConnectUI();

    const swapRoutes = useSwapRoutesSelector();

    const [inputAssetAmount, setInputAssetAmount] = useState('');
    const [inputAsset, setInputAsset] = useState(DEFAULT_ASSETS_RECORD[TON]);
    const [outputAsset, setOutputAsset] = useState(DEFAULT_ASSETS_RECORD[USDT]);

    // const handleLoadButtonClick = () => {
    //     if (inputAsset && outputAsset && inputAssetAmount !== '') {
    //         dispatch(
    //             loadSwapRoutesActions.submit({
    //                 inputAssetAmount: toNano(
    //                     inputAssetAmount,
    //                     inputAsset.decimals
    //                 ).toString(),
    //                 inputAssetAddress: inputAsset.address,
    //                 outputAssetAddress: outputAsset.address
    //             })
    //         );
    //     }
    // };

    const handleConnectWalletButtonClick = () => tonConnectUI.modal.open();

    const handleSwapButtonClick = async () => {
        const senderAddress = tonConnectUI.wallet?.account.address ?? '';

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
                <InputOutputSelector onClick={() => 0} />
                <CustomInput
                    label="You receive"
                    isInputEnabled={false}
                    inputValue={''}
                    assetValue={outputAsset}
                    onAssetValueChange={setOutputAsset}
                />
            </div>

            {tonConnectUI.wallet ? (
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
