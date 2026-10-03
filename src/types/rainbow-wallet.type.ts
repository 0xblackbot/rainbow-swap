export type RainbowWalletInfo = {
    address: string;
    isDeployed: boolean;
};

export type RainbowWalletStateResponse = RainbowWalletInfo & {
    tonBalance: string;
};

export type RainbowJettonBalances = {
    balances: {balance: string; wallet_address: {address: string}}[];
};

export type RainbowWithdrawal = {
    ownerAddress: string;
    hash: string;
    messages: import('./message.type').Message[];
    submittedAt: number;
    status: 'pending' | 'completed' | 'failed';
};
