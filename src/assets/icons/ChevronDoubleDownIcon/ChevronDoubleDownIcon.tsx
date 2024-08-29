import {FC} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const ChevronDoubleDownIcon: FC<IconProps> = ({
    width = 24,
    height = 24,
    className
}): JSX.Element => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7 13L12 18L17 13M7 6L12 11L17 6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
