import {isDefined} from '@rnw-community/shared';
import {FC, useState} from 'react';

import {Tooltip} from './tooltip';
import {TooltipContent} from './tooltip-content';
import styles from './tooltip-icon.module.css';
import {TooltipTrigger} from './tooltip-triget';
import {InfoIcon} from '../../assets/icons/InfoIcon/InfoIcon';

interface Props {
    text?: string;
}

export const TooltipIcon: FC<Props> = ({text}) => {
    const [open, setOpen] = useState(false);

    const onTouchEnd = () => setOpen(v => !v);
    const onMouseEnter = () => setOpen(true);
    const onMouseLeave = () => setOpen(false);

    if (!isDefined(text)) {
        return null;
    }

    return (
        <Tooltip open={open} onOpenChange={setOpen}>
            <TooltipTrigger
                className={styles.button}
                onTouchEnd={onTouchEnd}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <InfoIcon className={styles.icon} />
            </TooltipTrigger>
            <TooltipContent className={styles.tooltip}>{text}</TooltipContent>
        </Tooltip>
    );
};
