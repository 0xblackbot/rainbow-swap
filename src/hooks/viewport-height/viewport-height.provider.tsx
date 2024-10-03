import {viewport} from '@telegram-apps/sdk';
import {FC, PropsWithChildren, useState} from 'react';

import {ViewportHeightContext} from './viewport-height.context';

export const ViewportHeightProvider: FC<PropsWithChildren> = ({children}) => {
    const [value, setValue] = useState<number>(0);

    const updateValue = () => setValue(viewport.height as any);
    // const updateValue = () => setValue(window.Telegram.WebApp.viewportHeight);

    return (
        <ViewportHeightContext.Provider
            value={{
                value,
                updateValue
            }}
        >
            {children}
        </ViewportHeightContext.Provider>
    );
};
