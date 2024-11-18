import './polyfill';

import * as Sentry from '@sentry/react';
import {TonConnectUIProvider} from '@tonconnect/ui-react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {App} from './app/app';
import {GA_MEASUREMENT_ID, IS_TMA, isProd, UNSAFE_INIT_DATA} from './globals';
import {TELEGRAM_ANALYTICS_APP_NAME, TELEGRAM_ANALYTICS_TOKEN} from './secrets';
import {persistor, store} from './store';

import 'react-toastify/dist/ReactToastify.css';
import './ReactToastify.css';
import './index.css';

if (isProd) {
    Sentry.init({
        dsn: 'https://3786d11f809236e6c0fec755623e3e98@o4508318518411264.ingest.de.sentry.io/4508318523129936',
        release: 'rainbow-swap@1.0.0',
        integrations: [
            Sentry.captureConsoleIntegration({
                levels: ['error', 'debug', 'assert']
            }),
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
            Sentry.browserApiErrorsIntegration({
                setTimeout: true,
                setInterval: true,
                requestAnimationFrame: true,
                XMLHttpRequest: true,
                eventTarget: true
            }),
            Sentry.httpClientIntegration()
        ],
        tracesSampleRate: 1.0,
        tracePropagationTargets: ['localhost', /^https:\/\/rainbow\.ag/],
        replaysSessionSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        sendDefaultPii: true
    });

    ReactGA.initialize(GA_MEASUREMENT_ID, {
        gaOptions: {
            userId: UNSAFE_INIT_DATA.userId
        }
    });
}

if (IS_TMA) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.telegramAnalytics?.init({
        token: TELEGRAM_ANALYTICS_TOKEN,
        appName: TELEGRAM_ANALYTICS_APP_NAME
    });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <TonConnectUIProvider manifestUrl="https://rainbow.ag/tonconnect-manifest.json">
                <App />
                <button
                    onClick={() => {
                        throw new Error('This is your first error!');
                    }}
                >
                    Break the world
                </button>
            </TonConnectUIProvider>
        </PersistGate>
    </Provider>
);
