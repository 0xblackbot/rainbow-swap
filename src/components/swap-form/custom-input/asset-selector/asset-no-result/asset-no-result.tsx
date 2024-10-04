import {Suspense, lazy} from 'react';

import styles from './asset-no-result.module.css';
import {Skeleton} from '../../../../skeleton/skeleton';

const DuckNotFound = lazy(() => import('./duck-not-found/duck-not-found'));

export const AssetNoResult = () => (
    <div className={styles.noResultDiv}>
        <Suspense
            fallback={
                <Skeleton
                    isLoading={true}
                    className={styles.duck_not_found_fallback}
                />
            }
        >
            <DuckNotFound />
        </Suspense>
        <p>No assets found.</p>
    </div>
);
