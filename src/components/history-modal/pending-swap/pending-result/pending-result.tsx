import {FC, useMemo} from 'react';

import styles from './pending-result.module.css';
import {ExternalLinkIcon} from '../../../../assets/icons/ExternalLinkIcon/ExternalLinkIcon';
import {SwapStatus} from '../../../../enums/swap-status.enum';
import {useExplorerLinks} from '../../../../hooks/use-explorer-links.hook';
import {useAssetsRecordSelector} from '../../../../store/assets/assets-selectors';
import {OnchainSwap} from '../../../../store/interfaces/on-chain-swap.interface';
import {getAsset} from '../../../../utils/asset.utils';
import {fromNano} from '../../../../utils/big-int.utils';
import {getStatus} from '../../../../utils/onchain-swap.utils';
import {Button} from '../../../button/button';

interface Props {
    onchainSwap: OnchainSwap;
}

const ColorRecord: Record<SwapStatus, string> = {
    [SwapStatus.Success]: '#3E88F7',
    [SwapStatus.Failed]: '#FF5B00',
    [SwapStatus.PartiallyFilled]: '#FF5B00'
};

export const PendingResult: FC<Props> = ({onchainSwap}) => {
    const explorerLinks = useExplorerLinks();

    const assetsRecord = useAssetsRecordSelector();

    const transactionHref = explorerLinks.getTransactionLink(
        onchainSwap.bocHash
    );

    const data = useMemo(() => {
        const status = getStatus(onchainSwap);
        const statusColor = ColorRecord[status];

        const inputAsset = getAsset(
            onchainSwap.inputAssetAddress,
            assetsRecord
        );
        const sentAmount = fromNano(
            BigInt(onchainSwap.successNanoInputAssetAmount),
            inputAsset.decimals
        );
        const sentInfo = `${Number(sentAmount).toFixed(2)} ${inputAsset.symbol}`;

        const outputAsset = getAsset(
            onchainSwap.outputAssetAddress ?? '',
            assetsRecord
        );
        const receivedAmount = fromNano(
            BigInt(onchainSwap.nanoOutputAssetAmount),
            outputAsset.decimals
        );
        const receivedInfo = `${Number(receivedAmount).toFixed(2)} ${outputAsset.symbol}`;

        let returnedInfo: string | undefined = undefined;
        const intermediateTokensInfo: string[] = [];

        for (const [address, nanoAmount] of Object.entries(
            onchainSwap.failedAssetsRecord
        )) {
            const asset = getAsset(address, assetsRecord);

            const amount = fromNano(BigInt(nanoAmount), asset.decimals);

            const info = `${Number(amount).toFixed(2)} ${asset.symbol}`;

            if (address === onchainSwap.inputAssetAddress) {
                returnedInfo = info;
            } else {
                intermediateTokensInfo.push(info);
            }
        }

        return {
            status,
            statusColor,
            sentInfo,
            receivedInfo,
            returnedInfo,
            intermediateTokensInfo:
                intermediateTokensInfo.length === 0
                    ? undefined
                    : intermediateTokensInfo.join(', ')
        };
    }, [assetsRecord, onchainSwap]);

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <p className={styles.status} style={{color: data.statusColor}}>
                    {data.status}
                </p>
                <Button
                    size="xs"
                    mode="bezeled"
                    className={styles.link_button}
                    Component="a"
                    href={transactionHref}
                    target="_blank"
                >
                    <ExternalLinkIcon className={styles.link_icon} />
                </Button>
            </div>
            <div className={styles.row}>
                <p>Sent:</p>
                <p>{data.sentInfo}</p>
            </div>
            <div className={styles.row}>
                <p>Received:</p>
                <p>{data.receivedInfo}</p>
            </div>
            {data.returnedInfo && (
                <div className={styles.row}>
                    <p>Returned:</p>
                    <p>{data.returnedInfo}</p>
                </div>
            )}
            {data.intermediateTokensInfo && (
                <div className={styles.row}>
                    <p>Intermediate tokens received:</p>
                    <p>{data.intermediateTokensInfo}</p>
                </div>
            )}
        </div>
    );
};
