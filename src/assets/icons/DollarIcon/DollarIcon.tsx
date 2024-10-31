import {FC} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const DollarIcon: FC<IconProps> = ({
    width = 20,
    height = 20,
    className,
    onClick
}): JSX.Element => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="6 6 12 12"
        style={{fill: 'transparent'}}
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M14.5 9C14.5 9 13.7609 8 11.9999 8C8.49998 8 8.49998 12 11.9999 12C15.4999 12 15.5 16 12 16C10.5 16 9.5 15 9.5 15"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M12 7V17"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
