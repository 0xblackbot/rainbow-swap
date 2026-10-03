import {Address, beginCell, Cell, loadMessage, toNano} from '@ton/core';
import axios from 'axios';
import {getQueryId} from 'rainbow-swap-sdk';

import {JETTON_TRANSFER_GAS_AMOUNT} from '../globals';
import {Message} from '../types/message.type';
import {
    RainbowJettonBalances,
    RainbowWithdrawal
} from '../types/rainbow-wallet.type';

export const RAINBOW_TON_RESERVE = toNano('0.005');
const TON_WITHDRAW_GAS = toNano('0.02');
const WITHDRAW_TON = 430801;
const WITHDRAW_JETTON = 430802;

export const getRainbowJettonBalances = (
    address: string,
    signal: AbortSignal
) =>
    axios
        .get<RainbowJettonBalances>(
            `https://tonapi.io/v2/accounts/${encodeURIComponent(address)}/jettons`,
            {signal, timeout: 20_000}
        )
        .then(response => response.data);

export const buildRainbowWithdrawalMessages = (
    address: string,
    tonBalance: string,
    jettons: RainbowJettonBalances,
    maxMessages: number
): Message[] => {
    if (!/^\d+$/.test(tonBalance) || !Array.isArray(jettons.balances)) {
        throw new Error('Invalid Rainbow Wallet balances');
    }
    if (!Number.isInteger(maxMessages) || maxMessages < 1) {
        throw new Error('Wallet message capacity unavailable');
    }
    const destination = Address.parse(address).toString({bounceable: true});
    const messages: Message[] = [];
    const seen = new Set<string>();
    for (const jetton of jettons.balances) {
        if (
            typeof jetton.balance !== 'string' ||
            !/^\d+$/.test(jetton.balance)
        ) {
            throw new Error('Invalid jetton balance');
        }
        const amount = BigInt(jetton.balance);
        if (amount === 0n) continue;
        const jettonWallet = Address.parse(jetton.wallet_address.address);
        const key = jettonWallet.toRawString();
        if (seen.has(key)) throw new Error('Duplicate jetton wallet');
        seen.add(key);
        messages.push({
            address: destination,
            amount: JETTON_TRANSFER_GAS_AMOUNT.toString(),
            payload: beginCell()
                .storeUint(WITHDRAW_JETTON, 32)
                .storeUint(getQueryId(), 64)
                .storeAddress(jettonWallet)
                .storeCoins(amount)
                .endCell()
                .toBoc()
                .toString('base64')
        });
    }
    const surplus = BigInt(tonBalance) - RAINBOW_TON_RESERVE;
    if (surplus > 0n) {
        messages.push({
            address: destination,
            amount: TON_WITHDRAW_GAS.toString(),
            payload: beginCell()
                .storeUint(WITHDRAW_TON, 32)
                .storeUint(getQueryId(), 64)
                .storeCoins(surplus)
                .endCell()
                .toBoc()
                .toString('base64')
        });
    }
    return messages.slice(0, maxMessages);
};

export const normalizedWithdrawalHash = (boc: string) => {
    const message = loadMessage(Cell.fromBase64(boc).beginParse());
    if (message.info.type !== 'external-in')
        throw new Error('Expected external message');
    return beginCell()
        .storeUint(2, 2)
        .storeUint(0, 2)
        .storeAddress(message.info.dest)
        .storeUint(0, 4)
        .storeBit(false)
        .storeBit(true)
        .storeRef(message.body)
        .endCell()
        .hash()
        .toString('hex');
};

type TraceMessage = {hash: string; msg_type: string; raw_body?: string};
export type WithdrawalTrace = {
    emulated?: boolean;
    transaction: {
        success: boolean;
        account: {address: string};
        in_msg?: TraceMessage;
        out_msgs: TraceMessage[];
    };
    children?: WithdrawalTrace[];
};

export const getWithdrawalTrace = (hash: string, signal: AbortSignal) =>
    axios
        .get<WithdrawalTrace>(`https://tonapi.io/v2/traces/${hash}`, {
            signal,
            timeout: 20_000
        })
        .then(response => response.data);

export const getWithdrawalOutcome = (
    root: WithdrawalTrace,
    withdrawal: Pick<RainbowWithdrawal, 'messages'>
): 'pending' | 'completed' | 'failed' => {
    const nodes: WithdrawalTrace[] = [];
    const visit = (node: WithdrawalTrace) => {
        nodes.push(node);
        node.children?.forEach(visit);
    };
    visit(root);
    const received = new Set(nodes.map(node => node.transaction.in_msg?.hash));
    if (
        nodes.some(
            node =>
                node.emulated ||
                node.transaction.out_msgs.some(
                    message =>
                        message.msg_type === 'int_msg' &&
                        !received.has(message.hash)
                )
        )
    )
        return 'pending';
    if (nodes.some(node => !node.transaction.success)) return 'failed';
    const commands = nodes.filter(node => node.transaction.in_msg?.raw_body);
    const matched = withdrawal.messages.every(message => {
        const payload = Cell.fromBase64(message.payload!).hash();
        return commands.some(
            node =>
                Address.parse(node.transaction.account.address).equals(
                    Address.parse(message.address)
                ) &&
                Cell.fromBoc(
                    Buffer.from(node.transaction.in_msg!.raw_body!, 'hex')
                )[0]
                    .hash()
                    .equals(payload)
        );
    });
    return matched ? 'completed' : 'failed';
};
