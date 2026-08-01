import {SendTransactionRequest} from '@tonconnect/ui';

import {ArrayElement} from './array-element.type';

export type Message = ArrayElement<
    NonNullable<SendTransactionRequest['messages']>
>;
