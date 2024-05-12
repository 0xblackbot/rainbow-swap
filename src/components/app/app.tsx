import {useEffect} from 'react';

import styles from './app.module.css';
import {Home} from '../../screens/home/home.tsx';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {Header} from '../header/header.tsx';

const tg = window.Telegram.WebApp;

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        tg.ready();
        dispatch(loadAssetsActions.submit());
    }, [dispatch]);

    return (
        <div className={styles.App}>
            <Header />
            <Home />
        </div>
    );
};
