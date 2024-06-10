export const toNano = (value: string, decimals: number) => {
    const formattedValue = Number(value).toFixed(decimals);
    return BigInt(formattedValue.replace('.', ''));
};

export const fromNano = (value: bigint, decimals: number) =>
    String(Number(value) / 10 ** decimals);
