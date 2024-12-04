import {useEffect} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import styles from './app.module.css';
import {getErrorElement} from '../components/error-element/error-element';
import {BASE_URL, IS_TMA} from '../globals';
import {useDisableMainButton} from '../hooks/use-disable-main-button.hook';
import {useStateVersionCheck} from '../hooks/use-state-version-check.hook';
import {useThemeStyles} from '../hooks/use-theme-styles.hook';
import {useTonConnectModalStatus} from '../hooks/use-ton-connect-modal-status.hook';
import {HomeScreen} from '../screens/home-screen/home-screen';

const router = createBrowserRouter(
    [
        {
            path: '/:inputAssetSlug?/:outputAssetSlug?/*',
            element: <HomeScreen />,
            errorElement: getErrorElement()
        }
    ],
    {
        basename: BASE_URL
    }
);

export const App = () => {
    const tonConnectModalStatus = useTonConnectModalStatus();

    useThemeStyles();
    useDisableMainButton(tonConnectModalStatus === 'opened');
    useStateVersionCheck();

    useEffect(() => {
        if (IS_TMA) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
            window.Telegram.WebApp.enableClosingConfirmation();
            window.Telegram.WebApp.disableVerticalSwipes();

            /* eslint-disable @typescript-eslint/ban-ts-comment */
            try {
                if (
                    ['ios', 'android'].includes(window.Telegram.WebApp.platform)
                ) {
                    // @ts-expect-error
                    window.Telegram.WebApp?.requestFullscreen();
                }
            } catch (e) {
                console.log(e);
            }

            // @ts-expect-error
            window.Telegram.WebApp.onEvent('fullscreenChanged', () => {
                // @ts-expect-error
                if (window.Telegram.WebApp.isFullscreen) {
                    window.Telegram.WebApp.disableClosingConfirmation();
                } else {
                    window.Telegram.WebApp.enableClosingConfirmation();
                }
            });
        }
    }, []);

    return (
        <div className={styles.App}>
            <RouterProvider router={router} />
        </div>
    );
};
