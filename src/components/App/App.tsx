import {TonConnectUIProvider} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import './App.css';
import {ContextProvider} from '../../context/input-output.provider';
import {useAssetsHook} from '../../hooks/useAssetsHook.ts/useAssetsHook';
import {Body} from '../Body/Body';
import {Header} from '../Header/Header';
import {InputAssetModal} from '../InputAssetModal/InputAssetModal';
import {OutputAssetModal} from '../OutputAssetModal/OutputAssetModal';

const tg = window.Telegram.WebApp;

function App() {
    const {getAssets} = useAssetsHook();

    useEffect(() => {
        tg.ready();
        getAssets();
    }, [getAssets]);

    return (
        <TonConnectUIProvider manifestUrl="https://0xblackbot.github.io/rainbow-swap/tonconnect-manifest.json">
            <ContextProvider>
                <InputAssetModal />
                <OutputAssetModal />
                <div className="App">
                    <Header />
                    <Body />
                </div>
            </ContextProvider>
        </TonConnectUIProvider>
    );
}

export default App;
