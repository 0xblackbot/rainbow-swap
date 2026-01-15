import {useMergeRefs} from '@floating-ui/react';
import {forwardRef} from 'react';

import {useTooltipContext} from './use-tooltip-context.hook';

export const TooltipTrigger = forwardRef<
    HTMLElement,
    React.HTMLProps<HTMLElement>
>(({children, ...props}, propRef) => {
    const context = useTooltipContext();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childrenRef = (children as any).ref;
    const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

    return (
        <button
            ref={ref}
            data-state={context.open ? 'open' : 'closed'}
            {...context.getReferenceProps(props)}
            type="button"
        >
            {children}
        </button>
    );
});
