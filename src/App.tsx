import {useEffect} from 'react';

import './App.css';
import {Body} from './components/Body/Body';
import {Header} from './components/Header/Header';
import {InputTokenModal} from './components/InputTokenModal/InputTokenModal';
import {OutputTokenModal} from './components/OutputTokenModal/OutputTokenModal';
import {useAssetsHook} from './hooks/useAssetsHook.ts/useAssetsHook';

const tg = window.Telegram.WebApp;

function App() {
    const {getAssets} = useAssetsHook();
    useEffect(() => {
        tg.ready();
        getAssets();
    }, []);

    return (
        <>
            <OutputTokenModal />
            <InputTokenModal />
            <div className="App">
                <Header></Header>
                <Body></Body>
            </div>
        </>
    );
}

export default App;
