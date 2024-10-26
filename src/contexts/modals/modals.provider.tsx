import {FC, PropsWithChildren} from 'react';

import {ModalsContext} from './modals.context';
import {PointsModal} from '../../components/points-modal/points-modal';
import {RewardsModal} from '../../components/rewards-modal/rewards-modal';
import {useModalState} from '../../hooks/use-modal-state.hook';

export const ModalsProvider: FC<PropsWithChildren> = ({children}) => {
    const pointsModalState = useModalState();
    const rewardsModalState = useModalState();

    return (
        <ModalsContext.Provider
            value={{
                openPointsModal: pointsModalState.open,
                openRewardsModal: rewardsModalState.open
            }}
        >
            {children}

            <PointsModal
                isOpen={pointsModalState.isOpen}
                onClose={pointsModalState.close}
            />
            <RewardsModal
                isOpen={rewardsModalState.isOpen}
                onClose={rewardsModalState.close}
            />
        </ModalsContext.Provider>
    );
};
