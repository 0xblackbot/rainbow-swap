import {FC, type JSX} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const AlertIcon: FC<IconProps> = ({
    width = 20,
    height = 20,
    className,
    onClick
}): JSX.Element => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M6.85953 2.57347L1.21286 12.0001C1.09644 12.2018 1.03484 12.4303 1.03418 12.6631C1.03353 12.896 1.09385 13.1249 1.20914 13.3272C1.32443 13.5294 1.49068 13.698 1.69133 13.816C1.89199 13.9341 2.12006 13.9976 2.35286 14.0001H13.6462C13.879 13.9976 14.1071 13.9341 14.3077 13.816C14.5084 13.698 14.6746 13.5294 14.7899 13.3272C14.9052 13.1249 14.9655 12.896 14.9649 12.6631C14.9642 12.4303 14.9026 12.2018 14.7862 12.0001L9.13953 2.57347C9.02068 2.37754 8.85334 2.21555 8.65366 2.10313C8.45397 1.9907 8.22868 1.93164 7.99953 1.93164C7.77037 1.93164 7.54508 1.9907 7.3454 2.10313C7.14571 2.21555 6.97837 2.37754 6.85953 2.57347V2.57347Z"
            stroke="url(#paint0_linear)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 6V8.66667"
            stroke="#FF5B00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M8 11.334H8.00667"
            stroke="#FF5B00"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <defs>
            <linearGradient
                id="paint0_linear"
                x1="7.99953"
                y1="1.93164"
                x2="2.49737"
                y2="14.6339"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FF7A00" />
                <stop offset="1" stopColor="#FF3D00" />
            </linearGradient>
        </defs>
    </svg>
);
