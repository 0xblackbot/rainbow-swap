import * as Sentry from '@sentry/react';
import {isAxiosError} from 'axios';
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
        if (isAxiosError(error)) {
            Sentry.captureException(error, {
                extra: {
                    message: error.message,
                    name: error.name,
                    config: error.config,
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    data: error.response?.data,
                    headers: error.response?.headers,
                    request: error.request
                }
            });
        } else {
            Sentry.captureException(error);
        }

        return selector(error, caught);
    });
