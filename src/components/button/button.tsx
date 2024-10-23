import {EmptyFn} from '@rnw-community/shared';
import {
    AllHTMLAttributes,
    ElementType,
    FC,
    PropsWithChildren,
    useMemo
} from 'react';

import styles from './button.module.css';
import {getClassName} from '../../utils/style.utils';

interface Props
    extends PropsWithChildren,
        Omit<AllHTMLAttributes<HTMLButtonElement>, 'size'> {
    size: 'xs' | 's' | 'm' | 'l';
    mode: 'filled' | 'bezeled' | 'gray';
    stretched?: boolean;
    className?: string;
    Component?: ElementType;
    onClick?: EmptyFn;
}

const sizeClassNameRecord: Record<Props['size'], string> = {
    xs: styles.xs,
    s: styles.s,
    m: styles.m,
    l: styles.l
};

const modeClassNameRecord: Record<Props['mode'], string> = {
    filled: styles.filled,
    bezeled: styles.bezeled,
    gray: styles.gray
};

export const Button: FC<Props> = ({
    size,
    mode,
    stretched = false,
    className = '',
    Component = 'button',
    onClick,
    children,
    ...restProps
}) => {
    const sizeClassName = useMemo(() => sizeClassNameRecord[size], [size]);
    const modeClassName = useMemo(() => modeClassNameRecord[mode], [mode]);

    return (
        <Component
            className={getClassName(
                styles.button,
                sizeClassName,
                modeClassName,
                stretched ? styles.stretched : '',
                className
            )}
            onClick={onClick}
            {...restProps}
        >
            {children}
        </Component>
    );
};
