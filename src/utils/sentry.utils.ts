import {
    catchError,
    Observable,
    ObservableInput,
    ObservedValueOf,
    OperatorFunction
} from 'rxjs';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const sentryCatchError = <T, O extends ObservableInput<any>>(
    selector: (err: any, caught: Observable<T>) => O
): OperatorFunction<T, T | ObservedValueOf<O>> =>
    catchError((error, caught) => {
        return selector(error, caught);
    });
