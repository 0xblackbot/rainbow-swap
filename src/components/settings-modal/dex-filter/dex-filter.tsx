import {DEX_GROUPS} from 'rainbow-swap-sdk';

import {DexFilterToggle} from './dex-filter-toggle';
import styles from './dex-filter.module.css';
import {useDispatch} from '../../../store';
import {enableAllDexGroupsAction} from '../../../store/settings/settings-actions';
import {useDisabledDexGroupsSelector} from '../../../store/settings/settings-selectors';
import {Button} from '../../button/button';
import sharedStyles from '../settings-modal.module.css';

export const DexFilterSetting = () => {
    const dispatch = useDispatch();
    const disabledDexGroups = useDisabledDexGroupsSelector();
    const hasDisabledDexGroups = disabledDexGroups.length > 0;

    const handleEnableAllClick = () => dispatch(enableAllDexGroupsAction());

    return (
        <>
            <div className={`${sharedStyles.title_container} ${styles.header}`}>
                <p className={sharedStyles.title}>DEX filter</p>

                {hasDisabledDexGroups && (
                    <Button
                        size="xs"
                        mode="bezeled"
                        onClick={handleEnableAllClick}
                    >
                        <span>Enable all</span>
                    </Button>
                )}
            </div>
            <p className={sharedStyles.description}>
                Choose which DEXs Rainbow Swap can use when building routes for
                you.
            </p>
            <div className={styles.group_list}>
                {DEX_GROUPS.map(dexGroup => (
                    <DexFilterToggle dexGroup={dexGroup} key={dexGroup.id} />
                ))}
            </div>
        </>
    );
};
