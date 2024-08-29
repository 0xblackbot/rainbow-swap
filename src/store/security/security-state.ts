import {AppStatus} from 'rainbow-swap-sdk';

import {LoadableEntityState} from '../types';
import {createEntity} from '../utils/create-entity';

export interface SecurityState {
    appStatus: LoadableEntityState<AppStatus>;
}

export const securityInitialState: SecurityState = {
    appStatus: createEntity({
        isSwapsEnabled: true,
        message: ''
    })
};
