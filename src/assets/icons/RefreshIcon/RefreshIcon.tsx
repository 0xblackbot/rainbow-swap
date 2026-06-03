import {CSSProperties, FC, type JSX} from 'react';

import styles from './RefreshIcon.module.css';
import {REFRESH_ROUTE_INTERVAL} from '../../../globals';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';
import {getClassName} from '../../../utils/style.utils';

interface Props {
    width?: string;
    height?: string;
    onClick?: () => void;
    isAnimating?: boolean;
    disabled?: boolean;
}

interface RefreshSvgProps {
    className: string;
    style?: CSSProperties;
}

const RefreshSvg: FC<RefreshSvgProps> = ({className, style}): JSX.Element => (
    <svg
        className={className}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path
            d="M 19 3 v 5.25 H 14 M 20 12.5 A 8.25 8.25 0 1 1 17.8 6.9"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const RefreshIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    isAnimating = false,
    onClick,
    disabled = false
}): JSX.Element => {
    const isRoutesLoading = useIsRoutesLoadingSelector();
    const isTimerRunning = isAnimating && !isRoutesLoading && !disabled;
    const buttonStyle = {
        width,
        height,
        '--refresh-animation-duration': `${REFRESH_ROUTE_INTERVAL}ms`
    } as CSSProperties;
    const overlayStyle = isTimerRunning
        ? ({
              animationDuration: `${REFRESH_ROUTE_INTERVAL}ms`
          } as CSSProperties)
        : undefined;

    return (
        <button
            type="button"
            style={buttonStyle}
            className={getClassName(
                styles.refresh_icon_button,
                isRoutesLoading && !disabled ? styles.loading : '',
                isTimerRunning ? styles.timer_running : '',
                disabled ? styles.disabled : ''
            )}
            onClick={onClick}
            disabled={disabled}
            aria-label="Refresh route"
        >
            <RefreshSvg className={styles.refresh_icon} />
            <RefreshSvg
                className={getClassName(styles.refresh_icon, styles.overlay)}
                style={overlayStyle}
            />
        </button>
    );
};
