import {TonConnectUIProvider} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import './App.css';
import {AssetsProvider} from '../../context/assets/assets.provider';
import {ModalProvider} from '../../context/modal/modal.provider';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {Body} from '../Body/Body';
import {Header} from '../Header/Header';
import {InputAssetModal} from '../InputAssetModal/InputAssetModal';
import {OutputAssetModal} from '../OutputAssetModal/OutputAssetModal';

const tg = window.Telegram.WebApp;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        tg.ready();
        dispatch(loadAssetsActions.submit());
    }, [dispatch]);

    return (
        <TonConnectUIProvider manifestUrl="https://0xblackbot.github.io/rainbow-swap/tonconnect-manifest.json">
            <AssetsProvider>
                <ModalProvider>
                    <InputAssetModal />
                    <OutputAssetModal />
                    <div className="App">
                        <Header />
                        <Body />
                    </div>
                </ModalProvider>
            </AssetsProvider>
        </TonConnectUIProvider>
    );
}

export default App;
