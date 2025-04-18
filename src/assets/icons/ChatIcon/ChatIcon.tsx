import {FC, type JSX} from 'react';

import {IconProps} from '../../../interfaces/icon-props.interface';

export const ChatIcon: FC<IconProps> = ({
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
            d="M3.5 20.5L7.99735 19.5004C9.22867 20.1587 10.6037 20.5021 12 20.5C16.6945 20.5 20.5 16.6946 20.5 12C20.5 7.30546 16.6945 3.50001 12 3.50001C7.30545 3.50001 3.5 7.30546 3.5 12C3.4979 13.3963 3.8413 14.7713 4.4996 16.0027L3.5 20.5ZM9.52082 12C9.52082 12.5868 9.04513 13.0625 8.45832 13.0625C7.87152 13.0625 7.39582 12.5868 7.39582 12C7.39582 11.4132 7.87152 10.9375 8.45832 10.9375C9.04513 10.9375 9.52082 11.4132 9.52082 12ZM13.0625 12C13.0625 12.5868 12.5868 13.0625 12 13.0625C11.4132 13.0625 10.9375 12.5868 10.9375 12C10.9375 11.4132 11.4132 10.9375 12 10.9375C12.5868 10.9375 13.0625 11.4132 13.0625 12ZM15.5417 13.0625C16.1285 13.0625 16.6042 12.5868 16.6042 12C16.6042 11.4132 16.1285 10.9375 15.5417 10.9375C14.9549 10.9375 14.4792 11.4132 14.4792 12C14.4792 12.5868 14.9549 13.0625 15.5417 13.0625Z"
            fill="currentColor"
        ></path>
    </svg>
);
