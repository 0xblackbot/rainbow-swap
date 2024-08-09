import {FC} from 'react';

import styles from './RefreshIcon.module.css';
import {REFRESH_ROUTE_INTERVAL} from '../../../globals';
import {useIsRoutesLoadingSelector} from '../../../store/swap-routes/swap-routes-selectors';

interface Props {
    width?: string;
    height?: string;
    onClick?: () => void;
    isAnimating?: boolean;
}

export const RefreshIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    isAnimating = false,
    onClick
}) => {
    const isRoutesLoading = useIsRoutesLoadingSelector();

    return (
        <div
            style={{width, height}}
            className={styles.refresh_icon_div}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{width, height}}
            >
                <path
                    fill="currentColor"
                    d="M12 19.5c-4.125 0-7.5-3.375-7.5-7.5S7.875 4.5 12 4.5c2.063 0 3.937.875 5.25 2.25l-4 4H22V2l-2.937 2.938A9.97 9.97 0 0 0 12 2C6.5 2 2 6.5 2 12s4.437 10 10 10c4.605 0 8.425-3.076 9.625-7.273H18.98C17.915 17.543 15.165 19.5 12 19.5"
                ></path>
            </svg>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                style={{
                    width,
                    height,
                    animationDuration: `${REFRESH_ROUTE_INTERVAL}s`
                }}
                className={
                    isRoutesLoading
                        ? styles.refresh_icon_path_pulsating
                        : isAnimating
                          ? styles.refresh_icon_path_animated
                          : styles.refresh_icon_path_static
                }
            >
                <path
                    fill="currentColor"
                    d="M12 19.5c-4.125 0-7.5-3.375-7.5-7.5S7.875 4.5 12 4.5c2.063 0 3.937.875 5.25 2.25l-4 4H22V2l-2.937 2.938A9.97 9.97 0 0 0 12 2C6.5 2 2 6.5 2 12s4.437 10 10 10c4.605 0 8.425-3.076 9.625-7.273H18.98C17.915 17.543 15.165 19.5 12 19.5"
                ></path>
            </svg>
        </div>
    );
};
