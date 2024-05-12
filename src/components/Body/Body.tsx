import {Address} from '@ton/core';
import {useTonConnectUI} from '@tonconnect/ui-react';

import styles from './Body.module.css';
import {useAssetsContext} from '../../context/assets/assets.hook';
import {useModalContext} from '../../context/modal/modal.hook';
import {useSwapRouteBatch} from '../../hooks/use-swap-route-batch.hook';
import {useTonUI} from '../../hooks/use-ton-ui.hook';
import {CustomInput} from '../../shared/CustomInput/CustomInput';
import {FormButton} from '../../shared/FormButton/FormButton';
import {InputOutputSelector} from '../../shared/InputOutputSelector/InputOutputSelector';
import {toNano} from '../../utils/big-int.utils';
import {getClassName} from '../../utils/style.utils';
import {SwapRouteInfo} from '../SwapRouteInfo/SwapRouteInfo';

export const Body = () => {
    const [tonConnectUI] = useTonConnectUI();
    const {wallet, connectWallet} = useTonUI();
    const swapRouteBatch = useSwapRouteBatch();
    const {setOutputModalOpen, setInputModalOpen} = useModalContext();
    const {
        inputAsset,
        outputAsset,
        inputAssetAmount,
        setInputAsset,
        setOutputAsset,
        setInputAssetAmount
    } = useAssetsContext();

    const openOutputModal = () => {
        setOutputModalOpen(true);
    };

    const openInputModal = () => {
        setInputModalOpen(true);
    };

    const onSwapAssets = () => {
        setInputAssetAmount('');

        const temp = inputAsset;
        setInputAsset(outputAsset);
        setOutputAsset(temp);
    };

    const handleLoadButtonClick = () => {
        if (inputAsset && outputAsset && inputAssetAmount !== '') {
            const amount = toNano(inputAssetAmount, inputAsset.decimals);
            swapRouteBatch.loadData(
                amount,
                inputAsset.address,
                outputAsset.address
            );
        }
    };

    const handleSwapButtonClick = async () => {
        const senderAddress = tonConnectUI.wallet?.account.address ?? '';

        const messages = await Promise.all(
            swapRouteBatch.data.map(swapRoute =>
                swapRoute.getMessage(Address.parse(senderAddress))
            )
        );

        tonConnectUI.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
            from: senderAddress,
            messages
        });
    };

    const openNeededAssetModal = () => {
        if (!inputAsset) {
            openInputModal();
        } else {
            openOutputModal();
        }
    };

    return (
        <>
            <div className={styles.body_div}>
                <CustomInput
                    text="You pay"
                    asset={inputAsset}
                    value={inputAssetAmount}
                    onClick={openInputModal}
                    onChange={setInputAssetAmount}
                />
                <InputOutputSelector onClick={onSwapAssets} />
                <CustomInput
                    text="You receive"
                    asset={outputAsset}
                    isOutput={true}
                    onClick={openOutputModal}
                />
            </div>
            {wallet ? (
                outputAsset && inputAsset ? (
                    <>
                        <FormButton
                            text="Load"
                            type="button"
                            onClick={handleLoadButtonClick}
                            className={getClassName(
                                styles.body_button,
                                styles.swap_button
                            )}
                        />
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
                        text="Select an asset"
                        type="button"
                        onClick={openNeededAssetModal}
                        className={getClassName(
                            styles.body_button,
                            styles.select_button
                        )}
                    />
                )
            ) : (
                <FormButton
                    text="Connect Wallet"
                    type="button"
                    onClick={connectWallet}
                    className={getClassName(
                        styles.body_button,
                        styles.connect_button
                    )}
                />
            )}

            <SwapRouteInfo swapRouteBatch={swapRouteBatch.data} />
        </>
    );
};
