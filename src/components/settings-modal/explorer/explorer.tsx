import sharedStyles from '../settings-modal.module.css';
import {ExplorerButton} from './explorer-button';
import {Explorer} from '../../../enums/explorer.enum';

export const ExplorerSetting = () => (
    <>
        <div className={sharedStyles.title_container}>
            <p className={sharedStyles.title}>Explorer</p>
            <div className={sharedStyles.selector_container}>
                <ExplorerButton title="TONScan" value={Explorer.TONScan} />
                <div className={sharedStyles.selector_divider} />
                <ExplorerButton title="Tonviewer" value={Explorer.Tonviewer} />
            </div>
        </div>
        <p className={sharedStyles.description}>
            Choose your preferred blockchain explorer to view transaction
            details.
        </p>
    </>
);
