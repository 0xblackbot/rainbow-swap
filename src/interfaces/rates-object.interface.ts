export interface RateInfoArray {
    rates: {
        [key: string]: RateInfo;
    };
}

export interface RateInfo {
    prices: {
        TON: number;
        USD: number;
    };
}
