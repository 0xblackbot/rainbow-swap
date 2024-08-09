import {TonConnectUIProvider} from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {App} from './app/app';
import {GA_MEASUREMENT_ID, isProd} from './globals';
import {SwapFormProvider} from './hooks/swap-form/swap-form.provider';
import {ViewportHeightProvider} from './hooks/viewport-height/viewport-height.provider';
import {persistor, store} from './store';

import 'react-toastify/dist/ReactToastify.css';
import './ReactToastify.css';
import './index.css';

isProd && ReactGA.initialize(GA_MEASUREMENT_ID);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ViewportHeightProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SwapFormProvider>
                    <TonConnectUIProvider manifestUrl="https://rainbow.ag/tonconnect-manifest.json">
                        <App />
                    </TonConnectUIProvider>
                </SwapFormProvider>
            </PersistGate>
        </Provider>
    </ViewportHeightProvider>
);
