import {TonConnectUIProvider} from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {App} from './app/app';
import {GA_MEASUREMENT_ID, isProd, UNSAFE_INIT_DATA} from './globals';
import {ViewportHeightProvider} from './hooks/viewport-height/viewport-height.provider';
import {TELEGRAM_ANALYTICS_APP_NAME, TELEGRAM_ANALYTICS_TOKEN} from './secrets';
import {persistor, store} from './store';

import 'react-toastify/dist/ReactToastify.css';
import './ReactToastify.css';
import './index.css';

isProd &&
    ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
            userId: UNSAFE_INIT_DATA.userId
        }
    });

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
window.telegramAnalytics?.init({
    token: TELEGRAM_ANALYTICS_TOKEN,
    appName: TELEGRAM_ANALYTICS_APP_NAME
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ViewportHeightProvider>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <TonConnectUIProvider manifestUrl="https://rainbow.ag/tonconnect-manifest.json">
                    <App />
                </TonConnectUIProvider>
            </PersistGate>
        </Provider>
    </ViewportHeightProvider>
);
