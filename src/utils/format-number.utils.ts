export function formatNumber(number: number, fixedValue: number): string {
    if (isNaN(number)) {
        return '0';
    }

    const decimalPart = number.toString().split('.')[1];

    if (decimalPart === undefined || decimalPart.length <= fixedValue) {
        return number.toString();
    }

    return number.toFixed(fixedValue);
}
