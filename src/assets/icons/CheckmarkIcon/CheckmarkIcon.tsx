import {FC} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const CheckmarkIcon: FC<IconProps> = ({
    width = 24,
    height = 24,
    fill = '#34CC4E'
}) => (
    <svg
        fill={fill}
        width={width}
        height={height}
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
    >
        <title>checkmark</title>
        <path d="M16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM23.258 12.307l-9.486 9.485c-0.238 0.237-0.623 0.237-0.861 0l-0.191-0.191-0.001 0.001-5.219-5.256c-0.238-0.238-0.238-0.624 0-0.862l1.294-1.293c0.238-0.238 0.624-0.238 0.862 0l3.689 3.716 7.756-7.756c0.238-0.238 0.624-0.238 0.862 0l1.294 1.294c0.239 0.237 0.239 0.623 0.001 0.862z"></path>
    </svg>
);
