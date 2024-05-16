import {useIsConnectionRestored, useTonAddress} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {Home} from '../../screens/home/home.tsx';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {walletActions} from '../../store/balances/wallet-actions.ts';
import {Header} from '../header/header.tsx';

const tg = window.Telegram.WebApp;

export const App = () => {
    const dispatch = useDispatch();
    const connectionRestored = useIsConnectionRestored();
    const walletAddress = useTonAddress();

    useEffect(() => {
        tg.ready();
        dispatch(loadAssetsActions.submit());
    }, [dispatch]);

    useEffect(() => {
        dispatch(walletActions.submit(walletAddress));
    }, [dispatch, walletAddress]);

    return (
        <div className={styles.App}>
            <Header />
            {connectionRestored && <Home />}
        </div>
    );
};
