import {randomIntFromInterval} from './math.utils';
import {TransferParams} from '../interfaces/transfer-params.interface';
import {Message} from '../types/message.type';

export const getQueryId = () => randomIntFromInterval(1, 10 ** 6);

export const transferParamsToMessage = (
    transferParams: TransferParams
): Message => ({
    address: transferParams.to.toRawString(),
    amount: transferParams.value.toString(),
    payload: transferParams.body.toString()
});
