export interface BalanceObject {
    balance: string;
    wallet_address: {
        address: string;
        is_scam: boolean;
        is_wallet: boolean;
    };
    jetton: {
        address: string;
        name: string;
        symbol: string;
        decimals: number;
        image: string;
        verification: string;
    };
}

export interface BalancesArray {
    balances: BalanceObject[];
}
