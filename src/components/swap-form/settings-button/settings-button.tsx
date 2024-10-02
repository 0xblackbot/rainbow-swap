import {useCallback, useState} from 'react';

import {MaxSlippage} from './max-slippage/max-slippage';
import {RiskToleranceSetting} from './risk-tolerance/risk-tolerance';
import styles from './settings-button.module.css';
import {SettingsIcon} from '../../../assets/icons/SettingsIcon/SettingsIcon';
import {BottomSheet} from '../../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../shared/form-button/form-button';
import {Divider} from '../../points-modal/tasks/divider/divider';

export const SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = useCallback(() => setIsOpen(false), []);

    return (
        <>
            <SettingsIcon
                width="22px"
                height="22px"
                onClick={handleOpen}
                className={styles.settings_icon}
            />
            <BottomSheet
                isOpen={isOpen}
                headerTitle="Settings"
                onClose={handleClose}
            >
                <div className={styles.content_container}>
                    <MaxSlippage />
                    <Divider />
                    <RiskToleranceSetting />

                    <FormButton
                        text="Close"
                        containerClassName={styles.main_button}
                        onClick={handleClose}
                    />
                </div>
            </BottomSheet>
        </>
    );
};
