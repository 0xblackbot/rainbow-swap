import {useEffect} from 'react';
import {createBrowserRouter} from 'react-router';
import {RouterProvider} from 'react-router/dom';

import styles from './app.module.css';
import {ComplianceProvider} from '../compliance/compliance-provider';
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
            const restoreTelegramControls = (event: PageTransitionEvent) => {
                if (!event.persisted) {
                    return;
                }

                // The legal pages configure the same native Telegram controls.
                // Force the SDK to resend this cached page's state after a
                // back-forward cache restore.
                const mainButton = window.Telegram.WebApp.MainButton;
                const wasMainButtonVisible = mainButton.isVisible;
                const backButton = window.Telegram.WebApp.BackButton;
                const wasBackButtonVisible = backButton.isVisible;

                mainButton.hide();
                backButton.hide();

                if (wasMainButtonVisible) {
                    mainButton.show();
                }

                if (wasBackButtonVisible) {
                    backButton.show();
                }
            };

            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
            window.Telegram.WebApp.enableClosingConfirmation();
            window.Telegram.WebApp.disableVerticalSwipes();
            window.addEventListener('pageshow', restoreTelegramControls);

            try {
                if (
                    ['ios', 'android'].includes(window.Telegram.WebApp.platform)
                ) {
                    window.Telegram.WebApp?.requestFullscreen();
                }
            } catch (e) {
                console.log(e);
            }

            window.Telegram.WebApp.onEvent('fullscreenChanged', () => {
                if (window.Telegram.WebApp.isFullscreen) {
                    window.Telegram.WebApp.disableClosingConfirmation();
                } else {
                    window.Telegram.WebApp.enableClosingConfirmation();
                }
            });

            return () => {
                window.removeEventListener('pageshow', restoreTelegramControls);
            };
        }
    }, []);

    return (
        <main className={styles.App}>
            <ComplianceProvider>
                <RouterProvider router={router} />
            </ComplianceProvider>
        </main>
    );
};
