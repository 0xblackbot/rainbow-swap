export function formatNumber(number: number, fixedValue: number): string {
    if (isNaN(number)) {
        return '0';
    }

    const decimalPart = number.toString().split('.')[1];

    if (decimalPart === undefined || decimalPart.length <= fixedValue) {
        return number.toString();
    }

    const decimalsMultiplier = Math.pow(10, fixedValue);
    const roundedNumber =
        Math.floor(number * decimalsMultiplier) / decimalsMultiplier;

    return roundedNumber.toFixed(fixedValue);
}
