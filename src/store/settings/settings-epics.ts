import {Epic} from 'redux-observable';
import {map} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType} from 'ts-action-operators';

import {setSlippageToleranceActions} from './settings-actions.ts';

const setSettingsEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(setSlippageToleranceActions.submit),
        map(action => setSlippageToleranceActions.success(action.payload))
    );

export const settingsEpics = setSettingsEpic;
