import {FC} from 'react';

interface Props {
    width?: string;
    height?: string;
    className?: string;
}

export const ChevronDownIcon: FC<Props> = ({
    width = '16px',
    height = '16px',
    className = ''
}): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{width, height}}
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
        />
    </svg>
);
