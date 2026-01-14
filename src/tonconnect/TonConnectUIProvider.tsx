import {TonConnectUI} from '@tonconnect/ui';
import {FC, memo, PropsWithChildren, useMemo} from 'react';

import {TonConnectUIContext} from './TonConnectUIContext';

interface Props extends PropsWithChildren {
    manifestUrl: string;
}

const TonConnectUIProvider: FC<Props> = ({manifestUrl, children}) => {
    const tonConnectUI = useMemo(
        () => new TonConnectUI({manifestUrl}),
        [manifestUrl]
    );

    return (
        <TonConnectUIContext.Provider value={tonConnectUI}>
            {children}
        </TonConnectUIContext.Provider>
    );
};

export default memo(TonConnectUIProvider);
