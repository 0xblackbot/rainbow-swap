import {useIsConnectionRestored} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {isProd} from '../../globals.ts';
import {HomeScreen} from '../../screens/home-screen/home-screen.tsx';

console.log('isProd', isProd);
console.log('isDev', import.meta.env.DEV);

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

    return (
        <div className={styles.App}>{connectionRestored && <HomeScreen />}</div>
    );
};
