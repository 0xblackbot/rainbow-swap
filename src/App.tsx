import {useEffect} from 'react';

import './App.css';
import Body from './components/Body/Body';
import Header from './components/Header/Header';
import InputTokenModal from './components/InputTokenModal/InputTokenModal';
import OutputTokenModal from './components/OutputTokenModal/OutputTokenModal';

const tg = window.Telegram.WebApp;
// test commit
function App() {
    useEffect(() => {
        tg.ready();
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
