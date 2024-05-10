import {SendTransactionRequest} from '@tonconnect/ui-react';

import {ArrayElement} from './array-element.type';

export type Message = ArrayElement<SendTransactionRequest['messages']>;
