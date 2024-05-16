import {FC} from 'react';

interface Props {
    width?: string;
    height?: string;
}

export const ChevronRightIcon: FC<Props> = ({
    width = '16px',
    height = '16px'
}): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        style={{width, height}}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
    </svg>
);
