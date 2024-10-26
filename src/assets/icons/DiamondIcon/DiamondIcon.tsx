import {FC} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const DiamondIcon: FC<IconProps> = ({
    width = 20,
    height = 20,
    className,
    onClick
}): JSX.Element => (
    <svg
        width={width}
        height={height}
        className={className}
        viewBox="0 -1.5 20 20"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <title>diamond [#768]</title>
        <desc>Created with Sketch.</desc>
        <defs></defs>
        <g
            id="Page-1"
            stroke="none"
            strokeWidth="1.5"
            fill="none"
            fillRule="evenodd"
        >
            <g
                id="Dribbble-Light-Preview"
                transform="translate(-60.000000, -4840.000000)"
                fill="currentColor"
            >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                    <path
                        d="M20.18,4680 L7.819,4680 L4,4685.97804 L14,4697 L24,4685.76489 L20.18,4680 Z M19.095,4681.96452 L21.498,4685.59103 L13.985,4694.03062 L6.492,4685.77275 L8.925,4681.96452 L19,4681.96452 L19.095,4681.96452 Z"
                        id="diamond-[#768]"
                    ></path>
                </g>
            </g>
        </g>
    </svg>
);
