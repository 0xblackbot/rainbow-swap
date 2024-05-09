import {useContext, useEffect} from 'react';

import styles from './Body.module.css';
import {InputOutputContext} from '../../context/input-output.provider';
import {useSwapRoute} from '../../hooks/use-swap-route.hook';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import {CustomInput} from '../../shared/CustomInput/CustomInput';
import {ExchangeInfo} from '../../shared/ExchangeInfo/ExchangeInfo';
import {FormButton} from '../../shared/FormButton/FormButton';
import {InputOutputSelector} from '../../shared/InputOutputSelector/InputOutputSelector';
import {getClassName} from '../../utils/style.utils';

export const Body = () => {
    const {wallet, connectWallet} = useTonUIHooks();
    const swapRoute = useSwapRoute();
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

    const sendSwapRequest = () => {
        if (inputAsset && outputAsset) {
            const amount = BigInt(parseFloat(inputAssetAmount) * 1e9);
            swapRoute.loadData(amount, inputAsset.address, outputAsset.address);
        }
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

    useEffect(
        () => console.log('swapRoute.isLoading', swapRoute.isLoading),
        [swapRoute.isLoading]
    );
    useEffect(
        () => console.log('swapRoute.data', swapRoute.data),
        [swapRoute.data]
    );

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
                    <FormButton
                        text="Swap"
                        type="submit"
                        onClick={sendSwapRequest}
                        className={getClassName(
                            styles.body_button,
                            styles.swap_button
                        )}
                    />
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
