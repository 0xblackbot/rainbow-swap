import {useIsConnectionRestored} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {useTrackPageView} from '../../hooks/use-analytics.hook.ts';
import {HomeScreen} from '../../screens/home-screen/home-screen.tsx';

export const App = () => {
    const connectionRestored = useIsConnectionRestored();

    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation();
        window.Telegram.WebApp.MainButton.setText('Loading...');
        window.Telegram.WebApp.MainButton.showProgress();
        window.Telegram.WebApp.MainButton.show();
    }, []);

    useTrackPageView('App');

    return (
        <div className={styles.App}>{connectionRestored && <HomeScreen />}</div>
    );
};
