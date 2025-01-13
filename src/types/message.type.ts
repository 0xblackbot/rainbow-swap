import {SendTransactionRequest} from '@tonconnect/ui';

import {ArrayElement} from './array-element.type';

export type Message = ArrayElement<SendTransactionRequest['messages']>;
