import {TonConnectUIProvider} from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {App} from './components/app/app.tsx';
import {SwapFormProvider} from './hooks/swap-form/swap-form.provider.tsx';
import {ViewportHeightProvider} from './hooks/viewport-height/viewport-height.provider.tsx';
import {persistor, store} from './store';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ViewportHeightProvider>
        <SwapFormProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <TonConnectUIProvider manifestUrl="https://0xblackbot.github.io/rainbow-swap/tonconnect-manifest.json">
                        <App />
                    </TonConnectUIProvider>
                </PersistGate>
            </Provider>
        </SwapFormProvider>
    </ViewportHeightProvider>
);
