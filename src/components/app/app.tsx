import {useEffect} from 'react';

import styles from './app.module.css';
import {HomeScreen} from '../../screens/home-screen/home-screen.tsx';

export const App = () => {
    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation();
        window.Telegram.WebApp.MainButton.show();
    }, []);

    return (
        <div className={styles.App}>
            <HomeScreen />
        </div>
    );
};
