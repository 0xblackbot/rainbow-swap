import {TonConnectUIError} from '@tonconnect/ui';

/**
 * Base class for TonConnectUIReact errors. You can check if the error was triggered by the @tonconnect/ui-react using `err instanceof TonConnectUIReactError`.
 */
export class TonConnectUIReactError extends TonConnectUIError {
    constructor(...args: ConstructorParameters<typeof Error>) {
        super(...args);

        Object.setPrototypeOf(this, TonConnectUIReactError.prototype);
    }
}
