import {FloatingPortal, useMergeRefs} from '@floating-ui/react';
import {forwardRef} from 'react';

import {useTooltipContext} from './use-tooltip-context.hook';

export const TooltipContent = forwardRef<
    HTMLDivElement,
    React.HTMLProps<HTMLDivElement>
>(({style, ...props}, propRef) => {
    const context = useTooltipContext();
    const ref = useMergeRefs([context.refs.setFloating, propRef]);

    if (!context.open) return null;

    return (
        <FloatingPortal>
            <div
                ref={ref}
                style={{
                    ...context.floatingStyles,
                    ...style
                }}
                {...context.getFloatingProps(props)}
            />
        </FloatingPortal>
    );
});
