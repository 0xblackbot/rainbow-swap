import {useContext} from 'react';

import {Context} from '../../context/ContextProvider';
import useTonUIHooks from '../../hooks/useTonUIHooks/useTonUIHooks';
import CustomInput from '../../shared/CustomInput/CustomInput';
import ExchangeInfo from '../../shared/ExchangeInfo/ExchangeInfo';
import FormButton from '../../shared/FormButton/FormButton';
import InputOutputSelector from '../../shared/InputOutputSelector/InputOutputSelector';
import './Body.css';

const Body = () => {
    const {wallet, connectWallet} = useTonUIHooks();
    const {setOutputModalOpen, setInputModalOpen, inputToken, outputToken} =
        useContext(Context);

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
            <div className="body-div">
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
                        className="body-button body-swap-button"
                    />
                ) : (
                    <FormButton
                        text="Select a token"
                        type="button"
                        onClick={openOutputModal}
                        className="body-button body-select-button"
                    />
                )
            ) : (
                <FormButton
                    text="Connect Wallet"
                    type="button"
                    onClick={connectWallet}
                    className="body-button body-connect-button"
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

export default Body;
