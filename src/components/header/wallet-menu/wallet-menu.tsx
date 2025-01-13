import {FC, useCallback, useMemo, useState} from 'react';

import styles from './wallet-menu.module.css';
import {DollarIcon} from '../../../assets/icons/DollarIcon/DollarIcon';
import {HistoryIcon} from '../../../assets/icons/HistoryIcon/HistoryIcon';
import {LogoutIcon} from '../../../assets/icons/LogoutIcon/LogoutIcon';
import {ProfitsIcon} from '../../../assets/icons/ProfitsIcon/ProfitsIcon';
import {SettingsIcon} from '../../../assets/icons/SettingsIcon/SettingsIcon';
import {useModals} from '../../../contexts/modals/modals.hook';
import {trackButtonClick} from '../../../hooks/use-analytics.hook';
import {useDisableMainButton} from '../../../hooks/use-disable-main-button.hook';
import {useEnableBackButton} from '../../../hooks/use-enable-back-button.hook';
import {usePreventScroll} from '../../../hooks/use-prevent-scrolling.hook';
import {useTonConnectUI} from '../../../tonconnect/useTonConnectUI';
import {getClassName} from '../../../utils/style.utils';
import {Button} from '../../button/button';

interface Props {
    walletAddress: string;
}

export const WalletMenu: FC<Props> = ({walletAddress}) => {
    const [tonConnectUI] = useTonConnectUI();
    const modals = useModals();

    const [isOpen, setIsOpen] = useState(false);

    const shortWalletAddress = useMemo(
        () => walletAddress.slice(0, 4) + '...' + walletAddress.slice(-4),
        [walletAddress]
    );

    const onClose = useCallback(() => setIsOpen(false), []);

    usePreventScroll(isOpen);
    useDisableMainButton(isOpen);
    useEnableBackButton(isOpen, onClose);

    const handleMenuClick = () => {
        trackButtonClick('Header Menu');
        setIsOpen(value => !value);
    };
    const handleClose = () => {
        trackButtonClick('Header Menu Backdrop');
        onClose();
    };
    const handleRewardsCenterClick = () => {
        trackButtonClick('Header Rewards Center');
        modals.openRewardsModal();
        onClose();
    };
    const handleTradingCompetitionClick = () => {
        trackButtonClick('Header Trading Competition');
        modals.openTradingCompetitionModal();
        onClose();
    };
    const handleHistoryClick = () => {
        trackButtonClick('Header History');
        modals.openHistoryModal();
        onClose();
    };
    const handleSettingsClick = () => {
        trackButtonClick('Header Settings');
        modals.openSettingsModal();
        onClose();
    };
    const handleDisconnect = () => {
        trackButtonClick('Header Disconnect');
        tonConnectUI.disconnect();
        onClose();
    };

    return (
        <>
            <div
                className={getClassName(
                    styles.container,
                    isOpen ? styles.open : styles.close
                )}
            >
                <Button size="s" mode="filled" onClick={handleMenuClick}>
                    <span>{shortWalletAddress}</span>
                </Button>

                <div className={styles.menu_content}>
                    <Button
                        size="s"
                        mode="gray"
                        className={styles.menu_button}
                        onClick={handleRewardsCenterClick}
                    >
                        <DollarIcon className={styles.menu_button_icon} />
                        <span>Rewards Center</span>
                    </Button>
                    <Button
                        size="s"
                        mode="gray"
                        className={styles.menu_button}
                        onClick={handleTradingCompetitionClick}
                    >
                        <ProfitsIcon className={styles.menu_button_icon} />
                        <span>Trading Competition</span>
                    </Button>
                    <Button
                        size="s"
                        mode="gray"
                        className={styles.menu_button}
                        onClick={handleHistoryClick}
                    >
                        <HistoryIcon className={styles.menu_button_icon} />
                        <span>History</span>
                    </Button>
                    <Button
                        size="s"
                        mode="gray"
                        className={styles.menu_button}
                        onClick={handleSettingsClick}
                    >
                        <SettingsIcon className={styles.menu_button_icon} />
                        <span>Settings</span>
                    </Button>
                    <Button
                        size="s"
                        mode="gray"
                        className={getClassName(
                            styles.menu_button,
                            styles.disconnect_button
                        )}
                        onClick={handleDisconnect}
                    >
                        <LogoutIcon className={styles.menu_button_icon} />
                        <span>Disconnect</span>
                    </Button>
                </div>
            </div>

            <div
                className={getClassName(
                    styles.menu_backdrop,
                    isOpen ? styles.open : styles.close
                )}
                onClick={handleClose}
            ></div>
        </>
    );
};
