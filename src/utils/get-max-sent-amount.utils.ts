import {fromNano} from './big-int.utils';
import {formatNumber} from './format-number.utils';
import {
    GAS_AMOUNT,
    JETTON_TRANSFER_GAS_AMOUNT,
    TON,
    TON_DECIMALS
} from '../globals';

const MAX_BATCH_SIZE = 4;

export const getMaxSentAmount = (balance: string, address: string) => {
    if (address === TON) {
        const gasAmount = GAS_AMOUNT;
        const jettonGasAmount = 3n * JETTON_TRANSFER_GAS_AMOUNT;
        const totalGasAmount = gasAmount + jettonGasAmount;

        const tonBalanceWithFee =
            parseFloat(balance) -
            parseFloat(fromNano(totalGasAmount, TON_DECIMALS)) * MAX_BATCH_SIZE;

        const tonBalance = Math.max(tonBalanceWithFee, 0);
        return formatNumber(tonBalance, TON_DECIMALS);
    }

    return balance;
};
