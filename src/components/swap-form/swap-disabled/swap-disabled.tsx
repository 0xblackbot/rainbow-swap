import {FC, Suspense, lazy} from 'react';

import styles from './swap-disabled.module.css';
import {Skeleton} from '../../skeleton/skeleton';

const DuckAlert = lazy(() => import('./duck-alert/duck-alert'));

interface Props {
    message: string;
}

export const SwapDisabled: FC<Props> = ({message}) => (
    <div className={styles.container}>
        <Suspense
            fallback={
                <Skeleton
                    isLoading={true}
                    className={styles.duck_alert_fallback}
                />
            }
        >
            <DuckAlert />
        </Suspense>
        <div className={styles.list_container}>
            <p className={styles.title}>Attention</p>
            <p className={styles.message}>{message}</p>
        </div>
    </div>
);
