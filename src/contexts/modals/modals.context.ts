import {EmptyFn, emptyFn} from '@rnw-community/shared';
import {createContext} from 'react';

interface ModalsContextValues {
    openPointsModal: EmptyFn;
    openReferralsModal: EmptyFn;
}

export const ModalsContext = createContext<ModalsContextValues>({
    openPointsModal: emptyFn,
    openReferralsModal: emptyFn
});
