import {PROD_STATE_VERSION} from '../../globals';

export interface DevState {
    stateVersion: number;
}

export const devInitialState: DevState = {
    stateVersion: PROD_STATE_VERSION
};
