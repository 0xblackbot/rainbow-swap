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
        viewBox="0 0 24 24"
        style={{fill: 'transparent'}}
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            d="M4.8057 5.70615C5.39093 4.87011 5.68354 4.45209 6.11769 4.22604C6.55184 4 7.0621 4 8.08262 4H12H15.9174C16.9379 4 17.4482 4 17.8823 4.22604C18.3165 4.45209 18.6091 4.87011 19.1943 5.70615L19.7915 6.55926C20.6144 7.73493 21.0259 8.32277 21.0064 8.98546C20.9869 9.64815 20.5415 10.2107 19.6507 11.3359L14.375 18V18C13.6417 18.9263 13.275 19.3895 12.8472 19.5895C12.3103 19.8406 11.6897 19.8406 11.1528 19.5895C10.725 19.3895 10.3583 18.9263 9.625 18V18L4.34927 11.3359C3.4585 10.2107 3.01312 9.64815 2.99359 8.98546C2.97407 8.32277 3.38555 7.73493 4.20852 6.55926L4.8057 5.70615Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        <path
            d="M9 7.5L8.5 8.25V8.25C8.20344 8.69484 8.23479 9.28176 8.57706 9.69247L10.5 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);
