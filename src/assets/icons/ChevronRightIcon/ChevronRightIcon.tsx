import {FC} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const ChevronRightIcon: FC<IconProps> = ({width = 24, height = 24}) => (
    <svg
        width={width}
        height={height}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
    </svg>
);
