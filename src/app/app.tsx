import {useEffect} from 'react';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import {mainButton, init, expandViewport, enableClosingConfirmation, disableVerticalSwipes, setMiniAppHeaderColor, setMiniAppBackgroundColor} from '@telegram-apps/sdk';

import styles from './app.module.css';
import {getErrorElement} from '../components/error-element/error-element';
import {useDisableMainButton} from '../hooks/use-disable-main-button.hook';
import {useStateVersionCheck} from '../hooks/use-state-version-check.hook';
import {useTonConnectModalStatus} from '../hooks/use-ton-connect-modal-status.hook';
import {useViewportHeight} from '../hooks/viewport-height/viewport-height.hook';
import {HomeScreen} from '../screens/home-screen/home-screen';

const router = createBrowserRouter([
    {
        path: '/:inputAssetSlug?/:outputAssetSlug?/*',
        element: <HomeScreen />,
        errorElement: getErrorElement()
    }
]);

export const App = () => {
    const viewportHeight = useViewportHeight();
    const tonConnectModalStatus = useTonConnectModalStatus();

    useDisableMainButton(tonConnectModalStatus === 'opened');
    useStateVersionCheck();

    useEffect(() => {
        const computedStyle = getComputedStyle(document.documentElement);
        const bgColor = computedStyle.getPropertyValue('--bg-color').trim();

        init();
        // window.Telegram.WebApp.ready();
        expandViewport();
        // window.Telegram.WebApp.expand();
        enableClosingConfirmation();
        // window.Telegram.WebApp.enableClosingConfirmation();
        disableVerticalSwipes();
        // window.Telegram.WebApp.disableVerticalSwipes();
        mainButton.mount();
        // window.Telegram.WebApp.MainButton.show();
        setMiniAppHeaderColor(bgColor as any);
        // window.Telegram.WebApp.setHeaderColor(bgColor);
        setMiniAppBackgroundColor(bgColor as any);
        // window.Telegram.WebApp.setBackgroundColor(bgColor);
        // We wait for MainButton to be initialized
        setTimeout(() => viewportHeight.updateValue(), 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.App}>
            <RouterProvider router={router} />
        </div>
    );
};
