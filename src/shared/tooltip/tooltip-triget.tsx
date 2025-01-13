import {useMergeRefs} from '@floating-ui/react';
import {cloneElement, forwardRef, isValidElement} from 'react';

import {useTooltipContext} from './use-tooltip-context.hook';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const TooltipTrigger = forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & {asChild?: boolean}
>(({children, asChild = false, ...props}, propRef) => {
    const context = useTooltipContext();
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && isValidElement(children)) {
        return cloneElement(
            children,
            context.getReferenceProps({
                ref,
                ...props,
                ...(children.props as any),
                'data-state': context.open ? 'open' : 'closed'
            })
        );
    }

    return (
        <button
            ref={ref}
            data-state={context.open ? 'open' : 'closed'}
            {...context.getReferenceProps(props)}
        >
            {children}
        </button>
    );
});
