import {isDefined} from '@rnw-community/shared';
import {Address, beginCell} from '@ton/core';
import {useTonConnectUI, useTonWallet} from '@tonconnect/ui-react';
import {FC, useEffect, useState} from 'react';

import styles from './swap-button.module.css';
import {BottomSheet} from '../../../../components/bottom-sheet/bottom-sheet.tsx';
import {TransferParams} from '../../../../interfaces/transfer-params.interface.ts';
import {FormButton} from '../../../../shared/FormButton/FormButton.tsx';
import {useIsRainbowWalletActiveSelector} from '../../../../store/wallet/wallet-selectors.ts';
import {transferParamsToMessages} from '../../../../swap-routes/shared/message.utils.ts';
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

    const wallet = useTonWallet();
    const [tonConnectUI] = useTonConnectUI();

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // const walletAddress = wallet?.account.address ?? '';
        // const senderAddress = Address.parse(
        //     'EQCT70SehkXbtL9yUg0HbM-pm1uV7FLi6IVbqpbf9CqlFEjj'
        // );
        // terminal.log('isRainbowWalletActive', isRainbowWalletActive);
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
    //     const transferParams = await getSwapRouteTransferParams(
    //          swapRoute,
    //          senderAddress
    //     );
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
        console.log('handleConfirm');
    };
    const handleActivateContract = async () => {
        console.log('handleActivateContract');
        const walletAddress = wallet?.account.address ?? '';

        const senderAddress = Address.parse(walletAddress);
        const senderRawAddress = senderAddress.toRawString();

        const transferParams: TransferParams = {
            to: Address.parse(
                'UQAlQ9Ht7rRtziR2LcQ2Glr9_6TSI5ODlH-h8ZSE6qFfLFQ7'
            ),
            value: 12n,
            body: beginCell().endCell()
        };

        const messages = transferParamsToMessages([transferParams]);

        const response = await tonConnectUI
            .sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 1 * 60,
                from: senderRawAddress,
                messages
            })
            .catch(() => undefined);

        if (isDefined(response)) {
            // dispatch(
            //     addPendingSwapTransactionActions.submit({
            //         senderRawAddress,
            //         bocHash: bocToHash(response.boc)
            //     })
            // );
        }
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
                    {!isRainbowWalletActive ? (
                        <FormButton
                            text="Confirm"
                            containerClassName={styles.main_button}
                            onClick={handleConfirm}
                        ></FormButton>
                    ) : (
                        <FormButton
                            text="Activate contract"
                            containerClassName={styles.main_button}
                            onClick={handleActivateContract}
                        ></FormButton>
                    )}
                </div>
            </BottomSheet>
        </>
    );
};
