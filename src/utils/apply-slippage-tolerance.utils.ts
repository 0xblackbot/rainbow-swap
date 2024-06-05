export const applySlippageTolerance = (
    amount: string,
    slippageTolerance: string
) => {
    return (
        (BigInt(amount) *
            BigInt(Math.floor(100 - parseFloat(slippageTolerance)))) /
        100n
    );
};
