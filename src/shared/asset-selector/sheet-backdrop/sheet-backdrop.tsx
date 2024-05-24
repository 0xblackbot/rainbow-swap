/* eslint-disable @typescript-eslint/no-explicit-any */
import {motion, MotionProps} from 'framer-motion';
import {forwardRef} from 'react';

type CommonProps = MotionProps & {
    className?: string;
};

export type SheetBackdropProps = Omit<
    CommonProps,
    'initial' | 'animate' | 'exit'
>;

const styles: Record<string, any> = {
    backdrop: {
        zIndex: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        touchAction: 'none',
        border: 'none'
    }
};

export const SheetBackdrop = forwardRef<any, SheetBackdropProps>(
    ({style = {}, className = '', ...rest}, ref) => {
        return (
            <motion.button
                {...rest}
                ref={ref}
                className={`react-modal-sheet-backdrop ${className}`}
                style={{...styles.backdrop, ...style, pointerEvents: 'auto'}}
                initial={{opacity: 0}}
                animate={{opacity: 0.6}}
                exit={{opacity: 0}}
                transition={{duration: 0.3}}
            />
        );
    }
);

SheetBackdrop.displayName = 'SheetBackdrop';
