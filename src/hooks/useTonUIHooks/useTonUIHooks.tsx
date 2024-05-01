import {useTonConnectUI, useTonWallet} from '@tonconnect/ui-react';

const useTonUIHooks = () => {
    const [tonConnectUI] = useTonConnectUI();

    const wallet = useTonWallet();

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
        sendTonTransaction,
        connectWallet,
        disconnectWallet
    };
};

export default useTonUIHooks;
