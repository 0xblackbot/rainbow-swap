import styles from './asset-no-result.module.css';
import {NoResultsIcon} from '../../../../../assets/icons/NoResultIcon/NoResultIcon';

export const AssetNoResult = () => {
    return (
        <div className={styles.noResultDiv}>
            <NoResultsIcon width="150px" height="150px" />
            <p>No assets found.</p>
        </div>
    );
};
