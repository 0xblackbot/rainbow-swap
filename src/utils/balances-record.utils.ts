import {Address} from '@ton/ton';
import {AxiosResponse} from 'axios';

import {fromNano} from './big-int.utils';
import {GAS_AMOUNT, TON} from '../globals';
import {BalancesArray} from '../interfaces/balance-object.interface';
import {TonBalanceArray} from '../interfaces/ton-balance-response.interface';
import {BalancesRecord} from '../types/balances-record.type';

const TON_DECIMALS = 9;

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
        BigInt(accountResponse.data.balance) - GAS_AMOUNT * 4n,
        TON_DECIMALS
    );

    if (parseFloat(balancesRecord[TON]) < 0) {
        balancesRecord[TON] = '0';
    }
    return balancesRecord;
};
