import {FC} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const TwitterIcon: FC<IconProps> = ({
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClick}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 4.25C4.71906 4.25 4.46168 4.40701 4.33313 4.65681C4.20457 4.90662 4.22641 5.20732 4.3897 5.43593L9.77185 12.9709L4.46012 18.4794C4.1726 18.7776 4.18123 19.2524 4.4794 19.5399C4.77757 19.8274 5.25236 19.8188 5.53988 19.5206L10.6586 14.2123L14.3897 19.4359C14.5305 19.633 14.7578 19.75 15 19.75H19.5C19.7809 19.75 20.0383 19.593 20.1669 19.3432C20.2954 19.0934 20.2736 18.7927 20.1103 18.5641L14.3026 10.4333L19.0399 5.5206C19.3274 5.22243 19.3188 4.74764 19.0206 4.46012C18.7224 4.1726 18.2476 4.18123 17.9601 4.4794L13.4159 9.19192L10.1103 4.56407C9.96952 4.36697 9.74222 4.25 9.5 4.25H5ZM15.386 18.25L6.45739 5.75H9.11404L18.0426 18.25H15.386Z"
            fill="currentColor"
        ></path>
    </svg>
);
