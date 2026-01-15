import {Explorer} from '../enums/explorer.enum';
import {useExplorerSelector} from '../store/settings/settings-selectors';

const WalletLinksRecord: Record<Explorer, string> = {
    [Explorer.TONScan]: 'https://tonscan.org/address',
    [Explorer.Tonviewer]: 'https://tonviewer.com'
};

const TransactionLinksRecord: Record<Explorer, string> = {
    [Explorer.TONScan]: 'https://tonscan.org/tx',
    [Explorer.Tonviewer]: 'https://tonviewer.com/transaction'
};

export const useExplorerLinks = () => {
    const explorer = useExplorerSelector();

    const getWalletLink = (address: string) => {
        const explorerLink = WalletLinksRecord[explorer];

        return explorerLink + '/' + address;
    };

    const getTransactionLink = (bocHash?: string) => {
        const transactionLink = TransactionLinksRecord[explorer];

        return transactionLink + '/' + bocHash;
    };

    return {
        getWalletLink,
        getTransactionLink
    };
};
