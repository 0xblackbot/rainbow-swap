import {FC, PropsWithChildren} from 'react';

import {ModalsContext} from './modals.context';
import {PointsModal} from '../../components/points-modal/points-modal';
import {ReferralsModal} from '../../components/referrals-modal/referrals-modal';
import {useModalState} from '../../hooks/use-modal-state.hook';

export const ModalsProvider: FC<PropsWithChildren> = ({children}) => {
    const pointsModalState = useModalState();
    const referralsModalState = useModalState();

    return (
        <ModalsContext.Provider
            value={{
                openPointsModal: pointsModalState.open,
                openReferralsModal: referralsModalState.open
            }}
        >
            {children}

            <PointsModal
                isOpen={pointsModalState.isOpen}
                onClose={pointsModalState.close}
            />
            <ReferralsModal
                isOpen={referralsModalState.isOpen}
                onClose={referralsModalState.close}
            />
        </ModalsContext.Provider>
    );
};
