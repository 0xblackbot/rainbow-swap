export const truncateNumber = (number: string, decimals: number) => {
    if (number.length > decimals) {
        return number.slice(0, decimals) + '..';
    }

    return number;
};
