export const bocToHash = async (boc: string) => {
    const {Cell} = await import('@ton/core');

    const cell = Cell.fromBoc(Buffer.from(boc, 'base64'))[0];

    return cell.hash(0).toString('hex');
};
