import {lazy, Suspense} from 'react';

import styles from './tasks-end.module.css';
import {Skeleton} from '../../../skeleton/skeleton';

const DuckClap = lazy(() => import('./duck-clap/duck-clap'));

export const TasksEnd = () => (
    <div className={styles.container}>
        <Suspense
            fallback={
                <Skeleton
                    isLoading={true}
                    className={styles.duck_alert_fallback}
                />
            }
        >
            <DuckClap />
        </Suspense>
        <p>That's it, more coming soon!</p>
    </div>
);
