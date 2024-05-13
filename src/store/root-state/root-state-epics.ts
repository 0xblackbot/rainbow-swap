import {Epic, StateObservable, combineEpics} from 'redux-observable';
import {Observable, catchError} from 'rxjs';

import {assetsEpics} from '../assets/assets-epics.ts';
import {swapRoutesEpics} from '../swap-routes/swap-routes-epics.ts';

/* eslint-disable @typescript-eslint/no-explicit-any */
const rootStateEpics: Epic<any>[] = [assetsEpics, swapRoutesEpics];

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
