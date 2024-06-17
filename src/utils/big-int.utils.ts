// export const toNano = (value: string, decimals: number) =>
//     BigInt(Number(value) * 10 ** decimals);

export const fromNano = (value: bigint, decimals: number) =>
    String(Number(value) / 10 ** decimals);

export const toNano = (value: string, decimals: number): bigint => {
    let src = value;

    // Check sign
    let neg = false;
    while (src.startsWith('-')) {
        neg = !neg;
        src = src.slice(1);
    }

    // Split string
    if (src === '.') {
        throw Error('Invalid number');
    }
    const parts = src.split('.');
    if (parts.length > 2) {
        throw Error('Invalid number');
    }

    // Prepare parts
    let whole = parts[0];
    let frac = parts[1];
    if (!whole) {
        whole = '0';
    }
    if (!frac) {
        frac = '0';
    }
    if (frac.length > decimals) {
        throw Error('Invalid number');
    }
    while (frac.length < decimals) {
        frac += '0';
    }

    // Convert
    let r = BigInt(whole) * BigInt(10 ** decimals) + BigInt(frac);
    if (neg) {
        r = -r;
    }
    return r;
};
