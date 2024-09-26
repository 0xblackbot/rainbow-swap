import {FC, useState} from 'react';

import styles from './disclaimer.module.css';
import {AlertIcon} from '../../assets/icons/AlertIcon/AlertIcon';
import {ChevronDownIcon} from '../../assets/icons/ChevronDownIcon/ChevronDownIcon';
import {getClassName} from '../../utils/style.utils';

interface Props {
    title: string;
    description: string;
    isInitiallyOpen: boolean;
}

export const Disclaimer: FC<Props> = ({
    title,
    description,
    isInitiallyOpen
}) => {
    const [isOpen, setIsOpen] = useState(isInitiallyOpen);

    const toggleAccordion = () => setIsOpen(value => !value);

    return (
        <div className={styles.container}>
            <div className={styles.header} onClick={toggleAccordion}>
                <div className={styles.header_text_container}>
                    <AlertIcon />
                    <p className={styles.header_text}>{title}</p>
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
                <p className={styles.text}>{description}</p>
            </div>
        </div>
    );
};
