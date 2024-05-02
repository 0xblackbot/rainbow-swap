import {useContext} from 'react';

import styles from './Body.module.css';
import {InputOutputContext} from '../../context/input-output.provider';
import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import {CustomInput} from '../../shared/CustomInput/CustomInput';
import {ExchangeInfo} from '../../shared/ExchangeInfo/ExchangeInfo';
import {FormButton} from '../../shared/FormButton/FormButton';
import {InputOutputSelector} from '../../shared/InputOutputSelector/InputOutputSelector';

export const Body = () => {
    const {wallet, connectWallet} = useTonUIHooks();
    const {setOutputModalOpen, setInputModalOpen, inputToken, outputToken} =
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
                    token={inputToken}
                    onClick={openInputModal}
                />
                <InputOutputSelector />
                <CustomInput
                    text="You receive"
                    token={outputToken}
                    isOutput={true}
                    onClick={openOutputModal}
                />
            </div>
            {wallet ? (
                outputToken && inputToken ? (
                    <FormButton
                        text="Swap"
                        type="submit"
                        className={`${styles.body_button} ${styles.swap_button}`}
                    />
                ) : (
                    <FormButton
                        text="Select a token"
                        type="button"
                        onClick={openOutputModal}
                        className={`${styles.body_button} ${styles.select_button}`}
                    />
                )
            ) : (
                <FormButton
                    text="Connect Wallet"
                    type="button"
                    onClick={connectWallet}
                    className={`${styles.body_button} ${styles.connect_button}`}
                />
            )}
            {inputToken && outputToken ? (
                <ExchangeInfo
                    inputToken={inputToken}
                    outputToken={outputToken}
                />
            ) : null}
        </form>
    );
};
