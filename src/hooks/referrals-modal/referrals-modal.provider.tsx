import {FC, PropsWithChildren, useCallback, useState} from 'react';

import {ReferralsModalContext} from './referrals-modal.context';
import {ReferralsModal} from '../../components/referrals-modal/referrals-modal';

export const ReferralsModalProvider: FC<PropsWithChildren> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleClose = useCallback(() => setIsOpen(false), []);

    return (
        <ReferralsModalContext.Provider value={handleOpen}>
            {children}

            <ReferralsModal isOpen={isOpen} onClose={handleClose} />
        </ReferralsModalContext.Provider>
    );
};
