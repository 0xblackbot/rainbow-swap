import {
    useTonAddress,
    useTonConnectUI,
    useTonWallet
} from '@tonconnect/ui-react';

export const useTonUIHooks = () => {
    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();
    const walletAddress = useTonAddress();
    const rawWalletAddress = useTonAddress(false);

    const alteredWalletAddress =
        walletAddress?.slice(0, 6) + '...' + walletAddress?.slice(-4);

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

    const connectWallet = () => {
        tonConnectUI.openModal();
    };

    const disconnectWallet = async () => {
        await tonConnectUI.disconnect();
    };

    return {
        wallet,
        walletAddress,
        rawWalletAddress,
        alteredWalletAddress,
        sendTonTransaction,
        connectWallet,
        disconnectWallet
    };
};
