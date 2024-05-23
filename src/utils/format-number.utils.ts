export function formatNumber(number: number, fixedValue: number): string {
    if (isNaN(number)) {
        return '0.00';
    }

    return number.toFixed(fixedValue);
}
