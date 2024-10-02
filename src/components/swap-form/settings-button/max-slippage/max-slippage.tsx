import styles from './max-slippage.module.css';
import {useDispatch} from '../../../../store';
import {setMaxSlippageAction} from '../../../../store/settings/settings-actions';
import {useMaxSlippageSelector} from '../../../../store/settings/settings-selectors';
import {settingsInitialState} from '../../../../store/settings/settings-state';
import sharedStyles from '../settings-button.module.css';

const DEFAULT_SLIPPAGE_TOLERANCE = settingsInitialState.maxSlippage;

export const MaxSlippage = () => {
    const dispatch = useDispatch();
    const slippageTolerance = useMaxSlippageSelector();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/,/g, '.');

        if (value === '' || value === '0') {
            dispatch(setMaxSlippageAction(value));
            return;
        }

        if (value.charAt(0) === '.' || value.charAt(0) === ',') {
            value = '0.';
        }

        const regex = /^(\d+(\.\d{0,2})?)?$/;
        if (regex.test(value)) {
            const numericValue = parseFloat(value);
            if (numericValue >= 0 && numericValue <= 100) {
                dispatch(setMaxSlippageAction(value));
            }
        }
    };

    const handleBlur = () => {
        if (slippageTolerance === '') {
            dispatch(setMaxSlippageAction(DEFAULT_SLIPPAGE_TOLERANCE));
        } else {
            let formattedValue = parseFloat(slippageTolerance);

            if (isNaN(formattedValue)) {
                formattedValue = 0;
            }

            dispatch(setMaxSlippageAction(formattedValue.toFixed(2)));
        }
    };

    const handleAutoClick = () =>
        dispatch(setMaxSlippageAction(DEFAULT_SLIPPAGE_TOLERANCE));

    return (
        <>
            <div className={styles.max_slippage_container}>
                <p className={sharedStyles.title}>Max slippage</p>

                <div className={styles.input_container}>
                    <div
                        className={styles.auto_button}
                        onClick={handleAutoClick}
                    >
                        <p>Auto</p>
                    </div>
                    <input
                        type="tel"
                        inputMode="decimal"
                        className={styles.input}
                        value={slippageTolerance}
                        placeholder={DEFAULT_SLIPPAGE_TOLERANCE}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                    />
                    <span className={styles.percent_symbol}>%</span>
                </div>
            </div>
            <p className={sharedStyles.description}>
                Your transaction will revert if the price changes unfavorably by
                more than this percentage.
            </p>
        </>
    );
};
