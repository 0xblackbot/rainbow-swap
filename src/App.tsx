import {useEffect} from 'react';

import './App.css';
import {Body} from './components/Body/Body';
import {Header} from './components/Header/Header';
import {InputAssetModal} from './components/InputAssetModal/InputAssetModal';
import {OutputAssetModal} from './components/OutputAssetModal/OutputAssetModal';
import {useAssets} from './hooks/use-assets.hook';

const tg = window.Telegram.WebApp;

function App() {
    const {getAssets} = useAssets();

    useEffect(() => {
        tg.ready();
        getAssets();
    }, []);

    return (
        <>
            <OutputAssetModal />
            <InputAssetModal />
            <div className="App">
                <Header></Header>
                <Body></Body>
            </div>
        </>
    );
}

export default App;
