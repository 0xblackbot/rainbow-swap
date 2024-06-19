import {GAS_AMOUNT, JETTON_TRANSFER_GAS_AMOUNT, TON} from '../globals';

const MAX_BATCH_SIZE = 4;

export const getMaxSentAmount = (balance: string, address: string) => {
    if (address === TON) {
        const gasAmount = GAS_AMOUNT;
        const jettonGasAmount = 3n * JETTON_TRANSFER_GAS_AMOUNT;
        const totalGasAmount = gasAmount + jettonGasAmount;

        const tonBalanceWithFee =
            BigInt(balance) - totalGasAmount * BigInt(MAX_BATCH_SIZE);

        const tonBalance = Math.max(Number(tonBalanceWithFee), 0);
        return tonBalance.toString();
    }

    return balance;
};
