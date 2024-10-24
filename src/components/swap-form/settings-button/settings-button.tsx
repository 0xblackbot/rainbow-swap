import {useCallback, useEffect, useState} from 'react';

import {MaxSlippage} from './max-slippage/max-slippage';
import {RiskToleranceSetting} from './risk-tolerance/risk-tolerance';
import styles from './settings-button.module.css';
import {SettingsIcon} from '../../../assets/icons/SettingsIcon/SettingsIcon';
import {BottomSheet} from '../../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../shared/form-button/form-button';
import {Divider} from '../../points-modal/tasks/divider/divider';

export const SettingsButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => setIsOpen(value => !value);
    const handleOpen = () => setIsOpen(true);
    const handleClose = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        window.Telegram.WebApp.SettingsButton.show();
        window.Telegram.WebApp.SettingsButton.onClick(handleClick);

        return () => {
            window.Telegram.WebApp.SettingsButton.hide();
            window.Telegram.WebApp.SettingsButton.offClick(handleClick);
        };
    }, []);

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
                </div>
                <FormButton
                    text="Close"
                    containerClassName={styles.footer_container}
                    onClick={handleClose}
                />
            </BottomSheet>
        </>
    );
};
