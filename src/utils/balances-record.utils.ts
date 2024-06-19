import {Address} from '@ton/ton';
import {AxiosResponse} from 'axios';

import {fromNano} from './big-int.utils';
import {TON, TON_DECIMALS} from '../globals';
import {BalancesArray} from '../interfaces/balance-object.interface';
import {TonBalanceArray} from '../interfaces/ton-balance-response.interface';
import {BalancesRecord} from '../types/balances-record.type';

export const getBalancesRecord = (
    jettonsResponse: AxiosResponse<BalancesArray>,
    accountResponse: AxiosResponse<TonBalanceArray>
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
