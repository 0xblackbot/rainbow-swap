import {useEffect} from 'react';

import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {Body} from '../Body/Body';
import {Header} from '../Header/Header';
import {InputAssetModal} from '../InputAssetModal/InputAssetModal';
import {OutputAssetModal} from '../OutputAssetModal/OutputAssetModal';

import './App.css';

const tg = window.Telegram.WebApp;

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        tg.ready();
        dispatch(loadAssetsActions.submit());
    }, [dispatch]);

    return (
        <>
            <InputAssetModal />
            <OutputAssetModal />
            <div className="App">
                <Header />
                <Body />
            </div>
        </>
    );
}

export default App;
