import {StateObservable, combineEpics} from 'redux-observable';
import {Observable, catchError} from 'rxjs';

import {assetsEpics} from '../assets/assets-epics.ts';

export const rootEpic = (
    action$: Observable<any>,
    store$: StateObservable<any>,
    dependencies: any
) =>
    combineEpics(assetsEpics)(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );
