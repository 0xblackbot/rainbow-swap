import {TonConnectUIProvider} from '@tonconnect/ui-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {App} from './components/app/app.tsx';
import {persistor, store} from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TonConnectUIProvider manifestUrl="https://0xblackbot.github.io/rainbow-swap/tonconnect-manifest.json">
                    <App />
                </TonConnectUIProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
