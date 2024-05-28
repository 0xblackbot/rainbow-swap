import {FC, useState} from 'react';

import styles from './swap-button.module.css';
import {BottomSheet} from '../../../../components/bottom-sheet/bottom-sheet.tsx';
import {FormButton} from '../../../../shared/FormButton/FormButton.tsx';
import {SwapRouteDisclaimer} from '../../swap-route-info/swap-route-disclaimer/swap-route-disclaimer.tsx';
import {SwapRouteInfo} from '../../swap-route-info/swap-route-info.tsx';

interface Props {
    onSwap: () => void;
}

export const SwapButton: FC<Props> = ({onSwap}) => {
    // const dispatch = useDispatch();
    // const swapRoutes = useSwapRoutesSelector();
    //
    // const wallet = useTonWallet();
    // const [tonConnectUI] = useTonConnectUI();

    const [isOpen, setIsOpen] = useState(false);

    const handleSwap = () => {
        setIsOpen(true);
        onSwap();
    };
    const handleClose = () => setIsOpen(false);

    // const handleSwapClick2 = async () => {
    //     const walletAddress = wallet?.account.address;
    //
    //     if (!isDefined(walletAddress)) {
    //         throw new Error('Wallet address is not defined');
    //     }
    //
    //     const senderAddress = Address.parse(walletAddress);
    //     const senderRawAddress = senderAddress.toRawString();
    //
    //     const messages = await Promise.all(
    //         swapRoutes.map(swapRoute =>
    //             getSwapRouteMessage(swapRoute, senderAddress)
    //         )
    //     );
    //
    //     const response = await tonConnectUI
    //         .sendTransaction({
    //             validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
    //             from: senderRawAddress,
    //             messages
    //         })
    //         .catch(() => undefined);
    //
    //     if (isDefined(response)) {
    //         dispatch(
    //             addPendingSwapTransactionActions.submit({
    //                 senderRawAddress,
    //                 bocHash: bocToHash(response.boc)
    //             })
    //         );
    //     }
    // };

    return (
        <>
            <FormButton text="Swap" onClick={handleSwap} />
            <BottomSheet
                isOpen={isOpen}
                headerTitle="Confirm the swap"
                onClose={handleClose}
            >
                <div className={styles.content_container}>
                    <SwapRouteDisclaimer />
                    <SwapRouteInfo />
                </div>
            </BottomSheet>
        </>
    );
};
