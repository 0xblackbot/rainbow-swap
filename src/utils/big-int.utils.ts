export const toNano = (src: string, decimals: number) => {
    const precision = 10n ** BigInt(decimals);

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
    let r = BigInt(whole) * precision + BigInt(frac);
    if (neg) {
        r = -r;
    }
    return r;
};

export const fromNano = (value: bigint, decimals: number) =>
    String(Number(value) / 10 ** decimals);
