import {TooltipContext} from './tooltip-context';
import {TooltipOptions} from './tooltip-options.interface';
import {useTooltip} from './use-tooltip.hook';

export const Tooltip = ({
    children,
    ...options
}: {children: React.ReactNode} & TooltipOptions) => {
    const tooltip = useTooltip(options);

    return (
        <TooltipContext.Provider value={tooltip}>
            {children}
        </TooltipContext.Provider>
    );
};
