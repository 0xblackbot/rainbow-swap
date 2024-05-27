import {isNotEmptyString} from '@rnw-community/shared';
import {useIsConnectionRestored, useTonAddress} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import styles from './app.module.css';
import {SwapScreen} from '../../screens/home/swap-form/swap-form.tsx';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {loadBalancesActions} from '../../store/wallet/wallet-actions.ts';
import {Header} from '../header/header.tsx';

export const App = () => {
    const dispatch = useDispatch();
    const connectionRestored = useIsConnectionRestored();
    const walletAddress = useTonAddress();

    useEffect(() => {
        window.Telegram.WebApp.ready();
        window.Telegram.WebApp.expand();
        window.Telegram.WebApp.enableClosingConfirmation();
        dispatch(loadAssetsActions.submit());
        window.Telegram.WebApp.MainButton.show();
        window.Telegram.WebApp.MainButton.showProgress();
    }, [dispatch]);

    useEffect(() => {
        if (isNotEmptyString(walletAddress)) {
            dispatch(loadBalancesActions.submit(walletAddress));
        }
    }, [dispatch, walletAddress]);

    return (
        <div className={styles.App}>
            {connectionRestored && (
                <>
                    <Header />
                    <SwapScreen />
                </>
            )}
        </div>
    );
};
