import Lottie from 'lottie-react';
import {FC} from 'react';

import duckAlertAnimation from './duck-alert.json';
import styles from './swap-disabled.module.css';
import {Disclaimer} from '../../disclaimer/disclaimer';

interface Props {
    message: string;
}

export const SwapDisabled: FC<Props> = ({message}) => (
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
);
