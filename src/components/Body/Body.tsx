import {useContext} from 'react';

import styles from './Body.module.css';
import {InputOutputContext} from '../../context/input-output.provider';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import {CustomInput} from '../../shared/CustomInput/CustomInput';
import {ExchangeInfo} from '../../shared/ExchangeInfo/ExchangeInfo';
import {FormButton} from '../../shared/FormButton/FormButton';
import {InputOutputSelector} from '../../shared/InputOutputSelector/InputOutputSelector';
import {getClassName} from '../../utils/style.utils';

export const Body = () => {
    const {wallet, connectWallet} = useTonUIHooks();
    const {setOutputModalOpen, setInputModalOpen, inputAsset, outputAsset} =
        useContext(InputOutputContext);

    const openOutputModal = () => {
        setOutputModalOpen(true);
    };

    const openInputModal = () => {
        setInputModalOpen(true);
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
                    onClick={openInputModal}
                />
                <InputOutputSelector />
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
                        className={getClassName(
                            styles.body_button,
                            styles.swap_button
                        )}
                    />
                ) : (
                    <FormButton
                        text="Select a asset"
                        type="button"
                        onClick={openOutputModal}
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
