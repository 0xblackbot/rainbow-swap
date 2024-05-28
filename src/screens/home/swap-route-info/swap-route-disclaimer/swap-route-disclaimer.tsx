import {FC, useState} from 'react';

import styles from './swap-route-disclaimer.module.css';
import {AlertIcon} from '../../../../assets/icons/AlertIcon/AlertIcon';
import {ChevronDownIcon} from '../../../../assets/icons/ChevronDownIcon/ChevronDownIcon.tsx';
import {getClassName} from '../../../../utils/style.utils.ts';

export const SwapRouteDisclaimer: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => setIsOpen(value => !value);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header} onClick={toggleAccordion}>
                    <div className={styles.header_text_container}>
                        <AlertIcon />
                        <p className={styles.header_text}>Disclaimer</p>
                    </div>

                    <ChevronDownIcon
                        className={getClassName(
                            styles.chevron,
                            isOpen ? styles.open : ''
                        )}
                    />
                </div>
                <div
                    className={getClassName(
                        styles.content,
                        isOpen ? styles.open : ''
                    )}
                >
                    <p className={styles.text}>
                        This interface and the Rainbow Smart contract are
                        provided "as is", at your own risk, and without
                        warranties of any kind
                    </p>
                </div>
            </div>
        </>
    );
};
