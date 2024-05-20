import {isNotEmptyString} from '@rnw-community/shared';
import {useIsConnectionRestored, useTonAddress} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {Home} from '../../screens/home/home.tsx';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {loadBalancesActions} from '../../store/wallet/wallet-actions.ts';
import {Header} from '../header/header.tsx';

export const telegramWebApp = window.Telegram.WebApp;

export const App = () => {
    const dispatch = useDispatch();
    const connectionRestored = useIsConnectionRestored();
    const walletAddress = useTonAddress();

    useEffect(() => {
        telegramWebApp.ready();
        dispatch(loadAssetsActions.submit());
    }, [dispatch]);

    useEffect(() => {
        if (isNotEmptyString(walletAddress)) {
            dispatch(loadBalancesActions.submit(walletAddress));
        }
    }, [dispatch, walletAddress]);

    return (
        <div className={styles.App}>
            <Header />
            {connectionRestored && <Home />}
        </div>
    );
};
