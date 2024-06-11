import {useEffect} from 'react';

import styles from './app.module.css';
import {useViewportHeight} from '../../hooks/viewport-height/viewport-height.hook.ts';
import {HomeScreen} from '../../screens/home-screen/home-screen.tsx';

export const App = () => {
    const viewportHeight = useViewportHeight();

    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation();
        window.Telegram.WebApp.MainButton.show();
        // We wait for MainButton to be initialized
        setTimeout(() => viewportHeight.updateValue(), 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={styles.App}>
            <HomeScreen />
        </div>
    );
};
