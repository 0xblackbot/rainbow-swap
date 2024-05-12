import {TonConnectUIProvider} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import './App.css';
import {AssetsProvider} from '../../context/assets/assets.provider';
import {ModalProvider} from '../../context/modal/modal.provider';
import {useAssets} from '../../hooks/use-assets.hook';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {useAssetsRecordSelector} from '../../store/assets/assets-selectors.ts';
import {Body} from '../Body/Body';
import {Header} from '../Header/Header';
import {InputAssetModal} from '../InputAssetModal/InputAssetModal';
import {OutputAssetModal} from '../OutputAssetModal/OutputAssetModal';

const tg = window.Telegram.WebApp;

function App() {
    const assets = useAssets();
    const dispatch = useDispatch();

    const assetsRecord = useAssetsRecordSelector();

    console.log('assetsRecord', Object.values(assetsRecord).length);

    useEffect(() => {
        tg.ready();
        assets.loadData();
        dispatch(loadAssetsActions.submit());
    }, [assets.loadData]);

    return (
        <TonConnectUIProvider manifestUrl="https://0xblackbot.github.io/rainbow-swap/tonconnect-manifest.json">
            <AssetsProvider>
                <ModalProvider>
                    <InputAssetModal assets={assets.data} />
                    <OutputAssetModal assets={assets.data} />
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
