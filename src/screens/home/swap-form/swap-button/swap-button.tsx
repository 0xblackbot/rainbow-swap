import {FC, useEffect, useState} from 'react';
import terminal from 'virtual:terminal';

import styles from './swap-button.module.css';
import {BottomSheet} from '../../../../components/bottom-sheet/bottom-sheet.tsx';
import {FormButton} from '../../../../shared/FormButton/FormButton.tsx';
import {useIsRainbowWalletActiveSelector} from '../../../../store/wallet/wallet-selectors.ts';
import {RainbowWalletInfo} from '../../swap-route-info/rainbow-wallet-info/rainbow-wallet-info.tsx';
import {SwapRouteDisclaimer} from '../../swap-route-info/swap-route-disclaimer/swap-route-disclaimer.tsx';
import {SwapRouteInfo} from '../../swap-route-info/swap-route-info.tsx';

interface Props {
    onSwap: () => void;
}

export const SwapButton: FC<Props> = ({onSwap}) => {
    // const dispatch = useDispatch();
    // const swapRoutes = useSwapRoutesSelector();
    const isRainbowWalletActive = useIsRainbowWalletActiveSelector();
    //
    // const wallet = useTonWallet();
    // const [tonConnectUI] = useTonConnectUI();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // const walletAddress = wallet?.account.address ?? '';
        // const senderAddress = Address.parse(
        //     'EQCT70SehkXbtL9yUg0HbM-pm1uV7FLi6IVbqpbf9CqlFEjj'
        // );

        terminal.log('isRainbowWalletActive', isRainbowWalletActive);
    }, [isRainbowWalletActive]);

    const handleSwap = () => {
        setIsOpen(true);
        onSwap();
    };
    const handleClose = () => setIsOpen(false);

    // const handleSwapClick2 = async () => {
    //     const walletAddress = wallet?.account.address ?? '';
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

    const handleConfirm = () => {
        terminal.log('confirm Click');
    };

    return (
        <>
            <FormButton text="Swap" onClick={handleSwap} />
            <BottomSheet
                isOpen={isOpen}
                headerTitle="Confirm the swap"
                onClose={handleClose}
            >
                <div className={styles.content_container}>
                    {!isRainbowWalletActive && <RainbowWalletInfo />}
                    <SwapRouteInfo />
                    <SwapRouteDisclaimer />
                    <FormButton
                        text="Confirm"
                        containerClassName={styles.main_button}
                        onClick={handleConfirm}
                    ></FormButton>
                </div>
            </BottomSheet>
        </>
    );
};
