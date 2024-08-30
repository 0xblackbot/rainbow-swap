import Lottie from 'lottie-react';
import {FC} from 'react';

import duckAlertAnimation from './duck-alert.json';
import styles from './swap-disabled-big.module.css';
import {FormButton} from '../../../shared/form-button/form-button';
import {Disclaimer} from '../../disclaimer/disclaimer';

interface Props {
    message: string;
    onClose: () => void;
}

export const SwapDisabledBig: FC<Props> = ({message, onClose}) => (
    <>
        <div className={styles.container}>
            <Lottie
                loop={true}
                animationData={duckAlertAnimation}
                className={styles.animation_container}
            />
            <Disclaimer
                title="Alert"
                description={message}
                isInitiallyOpen={true}
            />
        </div>

        <FormButton
            text="Close"
            containerClassName={styles.main_button}
            onClick={onClose}
        ></FormButton>
    </>
);
