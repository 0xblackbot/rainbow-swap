import {MaxSplitsButton} from './max-splits-button';
import sharedStyles from '../settings-modal.module.css';

export const MaxSplitsSetting = () => (
    <>
        <div className={sharedStyles.title_container}>
            <p className={sharedStyles.title}>Parallel Transactions</p>
            <div className={sharedStyles.selector_container}>
                <MaxSplitsButton value={1} />
                <div className={sharedStyles.selector_divider} />
                <MaxSplitsButton value={2} />
                <div className={sharedStyles.selector_divider} />
                <MaxSplitsButton value={3} />
                <div className={sharedStyles.selector_divider} />
                <MaxSplitsButton value={4} />
            </div>
        </div>
        <p className={sharedStyles.description}>
            Configure the maximum number of parallel transactions to create more
            profitable routing strategies.
        </p>
    </>
);
