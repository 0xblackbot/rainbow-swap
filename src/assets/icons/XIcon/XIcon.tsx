import {FC} from 'react';

interface Props {
    width?: string;
    height?: string;
    className?: string;
    onClick?: () => void;
}

export const XIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    className = '',
    onClick
}): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        fill="none"
        style={{width, height}}
        className={className}
        onClick={onClick}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.71966 2.71968C3.01255 2.42678 3.48743 2.42677 3.78032 2.71966L8.00002 6.93925L12.2197 2.71967C12.5126 2.42677 12.9874 2.42678 13.2803 2.71967C13.5732 3.01257 13.5732 3.48744 13.2803 3.78033L9.06068 7.99991L13.2803 12.2197C13.5732 12.5126 13.5732 12.9874 13.2803 13.2803C12.9874 13.5732 12.5126 13.5732 12.2197 13.2803L8.00002 9.06057L3.78033 13.2803C3.48744 13.5732 3.01257 13.5732 2.71967 13.2803C2.42678 12.9874 2.42677 12.5126 2.71967 12.2197L6.93936 7.99991L2.71968 3.78034C2.42678 3.48745 2.42677 3.01257 2.71966 2.71968Z"
            fill="#909099"
        ></path>
    </svg>
);
