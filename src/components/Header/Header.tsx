import {useTonUIHooks} from '../../hooks/useTonUIHooks/useTonUIHooks';
import './Header.css';

export const Header = () => {
    const {wallet, connectWallet, disconnectWallet} = useTonUIHooks();

    return (
        <div className="header-div">
            <img src="logo.png" alt="1" className="header-logo"></img>
            {wallet ? (
                <button
                    onClick={disconnectWallet}
                    className="my-button-activated"
                >
                    Disconnect
                </button>
            ) : (
                <button onClick={connectWallet} className="my-button">
                    Connect
                </button>
            )}
        </div>
    );
};
