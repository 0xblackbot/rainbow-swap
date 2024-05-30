import {FC} from 'react';
interface Props {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const XCircledIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    className = '',
    onClick
}): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{width, height}}
        className={className}
        onClick={onClick}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
    </svg>
);
