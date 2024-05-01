import useTonUIHooks from '../../hooks/useTonUIHooks/useTonUIHooks';
import './Header.css';

const Header = () => {
    const {wallet, connectWallet, disconnectWallet} = useTonUIHooks();

    return (
        <div className="header-div">
            <img
                src={require('../../assets/images/logo.jpeg')}
                alt="1"
                className="header-logo"
            ></img>
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

export default Header;
