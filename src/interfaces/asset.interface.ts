export interface Asset {
    symbol: string;
    name: string;
    address: string;
    description: string;
    image: string;
    decimals: number;
    balance?: string;
}
