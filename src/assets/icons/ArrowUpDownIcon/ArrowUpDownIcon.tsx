import {FC, type JSX} from 'react';

interface Props {
    width?: string;
    height?: string;
    className?: string;
}

export const ArrowUpDownIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    className = ''
}): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        style={{width, height}}
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
        />
    </svg>
);
