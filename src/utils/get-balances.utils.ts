import {Address} from '@ton/ton';
import {AxiosResponse} from 'axios';

import {fromNano} from './big-int.utils';
import {TON} from '../globals';
import {BalancesArray} from '../interfaces/balance-object.interface';
import {BalancesRecord} from '../types/balances-record.type';

const TON_DECIMALS = 9;

export const getBalances = (
    jettonsResponse: AxiosResponse<BalancesArray>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    accountResponse: AxiosResponse<any>
) => {
    const balancesRecord: BalancesRecord = {};

    jettonsResponse.data.balances.forEach(balanceObject => {
        const parsedAddress = Address.parse(
            balanceObject.jetton.address
        ).toString();
        balancesRecord[parsedAddress] = fromNano(
            balanceObject.balance,
            balanceObject.jetton.decimals
        );
    });

    balancesRecord[TON] = fromNano(
        BigInt(accountResponse.data.balance),
        TON_DECIMALS
    );

    return balancesRecord;
};
