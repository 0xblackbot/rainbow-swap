import {FC, type JSX} from 'react';

interface Props {
    width?: string;
    height?: string;
    className?: string;
}

export const SearchIcon: FC<Props> = ({
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
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
    </svg>
);
