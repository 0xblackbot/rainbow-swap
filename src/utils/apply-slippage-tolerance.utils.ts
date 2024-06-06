export const applySlippageTolerance = (
    amount: string,
    slippageTolerance: string
) => {
    const decimals = slippageTolerance.split('.')[1]?.length || 0;
    const multiplier = BigInt(10 ** decimals);

    return (
        (BigInt(amount) *
            BigInt(
                Math.floor(
                    (100 - parseFloat(slippageTolerance)) * Number(multiplier)
                )
            )) /
        (BigInt(100) * multiplier)
    );
};
