import {emptyFn} from '@rnw-community/shared';
import {FC, useEffect} from 'react';

import {ExplorerSetting} from './explorer/explorer';
import {MaxSlippage} from './max-slippage/max-slippage';
import {RiskToleranceSetting} from './risk-tolerance/risk-tolerance';
import styles from './settings-modal.module.css';
import {ThemeSetting} from './theme/theme';
import {IS_TMA} from '../../globals';
import {MaxSplitsSetting} from './max-splits/max-splits';
import {ModalProps} from '../../interfaces/modal-props.intefrace';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';
import {Divider} from '../points-modal/social-tasks/divider/divider';

export const SettingsModal: FC<ModalProps> = ({
    isOpen,
    onOpen = emptyFn,
    onClose
}) => {
    useEffect(() => {
        if (IS_TMA) {
            window.Telegram.WebApp.SettingsButton.show();
            window.Telegram.WebApp.SettingsButton.onClick(onOpen);

            return () => {
                window.Telegram.WebApp.SettingsButton.hide();
                window.Telegram.WebApp.SettingsButton.offClick(onOpen);
            };
        }
    }, [onOpen]);

    return (
        <BottomSheet isOpen={isOpen} headerTitle="Settings" onClose={onClose}>
            <div className={styles.content_container}>
                <ThemeSetting />
                <Divider />
                <ExplorerSetting />
                <Divider />
                <MaxSlippage />
                <Divider />
                <RiskToleranceSetting />
                <Divider />
                <MaxSplitsSetting />
            </div>
            <FormButton
                text="Close"
                containerClassName={styles.footer_container}
                onClick={onClose}
            />
        </BottomSheet>
    );
};
