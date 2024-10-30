import {useMergeRefs} from '@floating-ui/react';
import {cloneElement, forwardRef, isValidElement} from 'react';

import {useTooltipContext} from './use-tooltip-context.hook';

export const TooltipTrigger = forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement> & {asChild?: boolean}
>(({children, asChild = false, ...props}, propRef) => {
    const context = useTooltipContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    // `asChild` allows the user to pass any element as the anchor
    if (asChild && isValidElement(children)) {
        return cloneElement(
            children,
            context.getReferenceProps({
                ref,
                ...props,
                ...children.props,
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
