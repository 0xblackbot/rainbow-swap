import {FC, useCallback, useState} from 'react';

import styles from './swap-button.module.css';
import {BottomSheet} from '../../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../shared/form-button/form-button';
import {useAppStatusSelector} from '../../../store/security/security-selectors';
import {SwapDetails} from '../swap-details/swap-details';
import {SwapDisabledBig} from '../swap-disabled/swap-disabled-big';

interface Props {
    onSwap: () => void;
}

export const SwapButton: FC<Props> = ({onSwap}) => {
    const appStatus = useAppStatusSelector();

    const [isOpen, setIsOpen] = useState(false);

    const handleSwap = useCallback(() => {
        setIsOpen(true);
        onSwap();
    }, [setIsOpen, onSwap]);
    const handleClose = () => setIsOpen(false);

    const handleConfirm = () => setIsOpen(false);

    return (
        <>
            <FormButton text="Swap" onClick={handleSwap} />
            <BottomSheet
                isOpen={isOpen}
                headerTitle="Confirm the swap"
                onClose={handleClose}
            >
                <div className={styles.content_container}>
                    {appStatus.isSwapsEnabled ? (
                        <SwapDetails onConfirm={handleConfirm} />
                    ) : (
                        <SwapDisabledBig
                            message={appStatus.message}
                            onClose={handleClose}
                        />
                    )}
                </div>
            </BottomSheet>
        </>
    );
};
