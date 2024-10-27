import {useEffect} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import styles from './app.module.css';
import {getErrorElement} from '../components/error-element/error-element';
import {useViewportHeight} from '../contexts/viewport-height/viewport-height.hook';
import {BASE_URL, IS_MAIN_BUTTON_AVAILABLE, IS_TMA} from '../globals';
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
    const viewportHeight = useViewportHeight();
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
            IS_MAIN_BUTTON_AVAILABLE &&
                window.Telegram.WebApp.MainButton.show();
        }

        const handleOrientationChange = () => {
            // We wait for MainButton to be initialized
            setTimeout(() => viewportHeight.updateValue(), 300);
        };

        window.addEventListener('resize', handleOrientationChange);

        handleOrientationChange();

        return () =>
            window.removeEventListener('resize', handleOrientationChange);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.App}>
            <RouterProvider router={router} />
        </div>
    );
};
