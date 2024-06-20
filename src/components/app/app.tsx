import {useEffect} from 'react';

import styles from './app.module.css';
import {PROD_STATE_VERSION} from '../../globals.ts';
import {useViewportHeight} from '../../hooks/viewport-height/viewport-height.hook.ts';
import {HomeScreen} from '../../screens/home-screen/home-screen.tsx';
import {resetState} from '../../store/actions.ts';
import {setDevVersionAction} from '../../store/dev/dev-actions.ts';
import {useDevVersionSelector} from '../../store/dev/dev-selectors.ts';
import {useDispatch} from '../../store/index.ts';

export const App = () => {
    const viewportHeight = useViewportHeight();
    const dispatch = useDispatch();
    const stateVersion = useDevVersionSelector();

    if (stateVersion !== PROD_STATE_VERSION) {
        dispatch(resetState());
        dispatch(setDevVersionAction(PROD_STATE_VERSION));
    }

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
        <div className={styles.App}>
            <HomeScreen />
        </div>
    );
};
