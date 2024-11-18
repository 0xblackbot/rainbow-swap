import {Epic, StateObservable, combineEpics} from 'redux-observable';
import {Observable} from 'rxjs';

import {sentryCatchError} from '../../utils/sentry.utils';
import {assetsEpics} from '../assets/assets-epics';
import {securityEpics} from '../security/security-epics';
import {swapRoutesEpics} from '../swap-routes/swap-routes-epics';
import {walletEpics} from '../wallet/wallet-epics';

/* eslint-disable @typescript-eslint/no-explicit-any */
const rootStateEpics: Epic<any, any, any>[] = [
    assetsEpics,
    swapRoutesEpics,
    walletEpics,
    securityEpics
];

export const rootEpic = (
    action$: Observable<any>,
    store$: StateObservable<any>,
    dependencies: any
) =>
    combineEpics(...rootStateEpics)(action$, store$, dependencies).pipe(
        sentryCatchError((error, source) => {
            console.log(error);
            return source;
        })
    );
