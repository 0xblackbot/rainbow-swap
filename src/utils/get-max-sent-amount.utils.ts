import {fromNano} from './big-int.utils';
import {GAS_AMOUNT, JETTON_TRANSFER_GAS_AMOUNT, TON_DECIMALS} from '../globals';

export const getMaxSentAmount = (balance: string) => {
    const gasAmount = GAS_AMOUNT;
    const jettonGasAmount = 3n * JETTON_TRANSFER_GAS_AMOUNT;
    const totalGasAmount = gasAmount + jettonGasAmount;

    //Or should we multiply it by 4 as well because we have 4 possible routes?
    const tonBalanceWithFee =
        parseFloat(balance) -
        parseFloat(fromNano(totalGasAmount, TON_DECIMALS));

    const tonBalance = Math.max(tonBalanceWithFee, 0);
    return tonBalance.toFixed(TON_DECIMALS);
};
