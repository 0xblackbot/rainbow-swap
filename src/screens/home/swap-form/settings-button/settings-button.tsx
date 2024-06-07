import {useCallback, useState} from 'react';

import styles from './settings-button.module.css';
import {ToleranceButton} from './ToleranceButton/ToleranceButton';
import {SettingsIcon} from '../../../../assets/icons/SettingsIcon/SettingsIcon';
import {BottomSheet} from '../../../../components/bottom-sheet/bottom-sheet';
import {FormButton} from '../../../../shared/FormButton/FormButton';
import {useDispatch} from '../../../../store';
import {setSlippageToleranceAction} from '../../../../store/settings/settings-actions';
import {useSlippageToleranceSelector} from '../../../../store/settings/settings-selectors';

export const SettingsButton = () => {
    const dispatch = useDispatch();
    const slippageTolerance = useSlippageToleranceSelector();
    const [isOpen, setIsOpen] = useState(false);

    const toleranceValues = ['1', '5', '10'];

    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = useCallback(() => {
        if (slippageTolerance === '') {
            dispatch(setSlippageToleranceAction('5'));
        }
        setIsOpen(false);
    }, [slippageTolerance, dispatch]);

    const handleToleranceClick = (value: string) => {
        dispatch(setSlippageToleranceAction(value));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/,/g, '.');

        if (value === '' || value === '0') {
            dispatch(setSlippageToleranceAction(value));
            return;
        }

        if (value.charAt(0) === '.' || value.charAt(0) === ',') {
            value = '0.';
        }

        const regex = /^(\d+(\.\d*)?)?$/;
        if (regex.test(value)) {
            const numericValue = parseFloat(value);
            if (numericValue >= 0 && numericValue <= 100) {
                dispatch(setSlippageToleranceAction(value));
            }
        }
    };

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
                    <p className={styles.content_name_p}>Slippage Tolerance</p>
                    <p className={styles.content_text_p}>
                        Your transaction will revert if the price changes
                        unfavorably by more than this percentage.
                    </p>
                    <div className={styles.input_container}>
                        <input
                            className={styles.content_input}
                            type="tel"
                            inputMode="decimal"
                            value={slippageTolerance}
                            placeholder="0"
                            onChange={handleInputChange}
                        />
                        <span className={styles.percent_symbol}>%</span>
                    </div>
                    <div className={styles.tolerance_buttons_container}>
                        {toleranceValues.map((value, index) => (
                            <ToleranceButton
                                key={index}
                                value={value}
                                onClick={() => handleToleranceClick(value)}
                                isSelected={slippageTolerance === value}
                            />
                        ))}
                    </div>
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
