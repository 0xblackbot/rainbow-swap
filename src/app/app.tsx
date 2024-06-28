import {TwaAnalyticsProvider} from '@tonsolutions/telemetree-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {
    TELEMETREE_API_KEY,
    TELEMETREE_APP_NAME,
    TELEMETREE_PROJECT_ID
} from '../globals';
import {useStateVersionCheck} from '../hooks/use-state-version-check.hook';
import {useViewportHeight} from '../hooks/viewport-height/viewport-height.hook';
import {HomeScreen} from '../screens/home-screen/home-screen';

export const App = () => {
    const viewportHeight = useViewportHeight();

    useStateVersionCheck();
    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation();
        window.Telegram.WebApp.MainButton.show();
        // We wait for MainButton to be initialized
        setTimeout(() => viewportHeight.updateValue(), 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TwaAnalyticsProvider
            projectId={TELEMETREE_PROJECT_ID}
            apiKey={TELEMETREE_API_KEY}
            appName={TELEMETREE_APP_NAME}
        >
            <div className={styles.App}>
                <HomeScreen />
            </div>
        </TwaAnalyticsProvider>
    );
};
