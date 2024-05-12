import {
    useTonAddress,
    useTonConnectUI,
    useTonWallet
} from '@tonconnect/ui-react';

export const useTonUI = () => {
    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const walletAddress = useTonAddress();

    const alteredWalletAddress =
        walletAddress?.slice(0, 4) + '...' + walletAddress?.slice(-4);

    const connectWallet = () => {
        tonConnectUI.openModal();
    };

    const disconnectWallet = async () => {
        await tonConnectUI.disconnect();
    };

    const sendTonTransaction = async (
        tonAddress: string,
        tonAmount: string,
        event: React.FormEvent
    ) => {
        event.preventDefault();
        const transaction = {
            messages: [
                {
                    address: tonAddress,
                    amount: tonAmount
                }
            ],
            validUntil: Math.floor(Date.now() / 1000) + 1 * 60
        };

        tonConnectUI.sendTransaction(transaction);
    };

    return {
        wallet,
        walletAddress,
        alteredWalletAddress,
        sendTonTransaction,
        connectWallet,
        disconnectWallet
    };
};
