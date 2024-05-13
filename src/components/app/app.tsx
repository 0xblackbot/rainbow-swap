import {useIsConnectionRestored} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {TestContainer} from './test-container/test-container.tsx';
import {Home} from '../../screens/home/home.tsx';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {Header} from '../header/header.tsx';

const tg = window.Telegram.WebApp;

export const App = () => {
    const dispatch = useDispatch();
    const connectionRestored = useIsConnectionRestored();

    useEffect(() => {
        tg.ready();
        dispatch(loadAssetsActions.submit());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <Header />
            {connectionRestored && <Home />}
            <TestContainer />
        </div>
    );
};
