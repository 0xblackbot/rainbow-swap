import {FC} from 'react';

import styles from './LoadingIcon.module.css';
import {IconProps} from '../../../interfaces/icon-props.interface';

export const LoadingIcon: FC<IconProps> = ({width = 20, height = 20}) => (
    <div className={styles.container} style={{width, height}}></div>
);
