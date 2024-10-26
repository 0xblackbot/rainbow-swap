import {EmptyFn, emptyFn} from '@rnw-community/shared';
import {createContext} from 'react';

interface ModalsContextValues {
    openPointsModal: EmptyFn;
    openRewardsModal: EmptyFn;
}

export const ModalsContext = createContext<ModalsContextValues>({
    openPointsModal: emptyFn,
    openRewardsModal: emptyFn
});
