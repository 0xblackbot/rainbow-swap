import {Epic, StateObservable, combineEpics} from 'redux-observable';
import {Observable, catchError} from 'rxjs';

import {assetsEpics} from '../assets/assets-epics';
import {pointsEpics} from '../points/points-epics';
import {securityEpics} from '../security/security-epics';
import {swapRoutesEpics} from '../swap-routes/swap-routes-epics';
import {walletEpics} from '../wallet/wallet-epics';

/* eslint-disable @typescript-eslint/no-explicit-any */
const rootStateEpics: Epic<any>[] = [
    assetsEpics,
    swapRoutesEpics,
    walletEpics,
    pointsEpics,
    securityEpics
];

export const rootEpic = (
    action$: Observable<any>,
    store$: StateObservable<any>,
    dependencies: any
) =>
    combineEpics(...rootStateEpics)(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );
