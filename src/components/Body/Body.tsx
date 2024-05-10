import {Address} from '@ton/core';
import {useTonConnectUI} from '@tonconnect/ui-react';
import {useContext} from 'react';

import styles from './Body.module.css';
import {InputOutputContext} from '../../context/input-output.provider';
import {useSwapRouteBatch} from '../../hooks/use-swap-route-batch.hook';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import {CustomInput} from '../../shared/CustomInput/CustomInput';
import {ExchangeInfo} from '../../shared/ExchangeInfo/ExchangeInfo';
import {FormButton} from '../../shared/FormButton/FormButton';
import {InputOutputSelector} from '../../shared/InputOutputSelector/InputOutputSelector';
import {getClassName} from '../../utils/style.utils';

export const Body = () => {
    const [tonConnectUI] = useTonConnectUI();
    const {wallet, connectWallet} = useTonUIHooks();
    const swapRouteBatch = useSwapRouteBatch();
    const {
        setOutputModalOpen,
        setInputModalOpen,
        inputAsset,
        outputAsset,
        setInputAsset,
        setOutputAsset,
        inputAssetAmount,
        setInputAssetAmount
    } = useContext(InputOutputContext);

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
        if (inputAsset && outputAsset) {
            const amount = BigInt(parseFloat(inputAssetAmount) * 1e9);
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

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
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
                            type="submit"
                            onClick={handleLoadButtonClick}
                            className={getClassName(
                                styles.body_button,
                                styles.swap_button
                            )}
                        />
                        <FormButton
                            text="Swap"
                            type="submit"
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
            {inputAsset && outputAsset ? (
                <ExchangeInfo
                    inputAsset={inputAsset}
                    outputAsset={outputAsset}
                />
            ) : null}
        </form>
    );
};
