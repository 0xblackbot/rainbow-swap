import type {DexGroup} from 'rainbow-swap-sdk';
import {FC} from 'react';

import styles from './dex-filter.module.css';
import {useDispatch} from '../../../store';
import {toggleDisabledDexGroupAction} from '../../../store/settings/settings-actions';
import {useDisabledDexGroupsSelector} from '../../../store/settings/settings-selectors';
import {getClassName} from '../../../utils/style.utils';

interface Props {
    dexGroup: DexGroup;
}

export const DexFilterToggle: FC<Props> = ({dexGroup}) => {
    const dispatch = useDispatch();
    const disabledDexGroups = useDisabledDexGroupsSelector();
    const isEnabled = !disabledDexGroups.includes(dexGroup.id);

    const handleClick = () =>
        dispatch(toggleDisabledDexGroupAction(dexGroup.id));

    return (
        <button
            type="button"
            role="switch"
            aria-checked={isEnabled}
            className={getClassName(
                styles.group_toggle,
                isEnabled ? styles.enabled : styles.disabled
            )}
            onClick={handleClick}
        >
            <span className={styles.dex_info}>
                <img src={dexGroup.image} alt="" className={styles.dex_image} />
                <span className={styles.dex_name}>{dexGroup.name}</span>
            </span>
            <span className={styles.switch_track}>
                <span className={styles.switch_thumb} />
            </span>
        </button>
    );
};
