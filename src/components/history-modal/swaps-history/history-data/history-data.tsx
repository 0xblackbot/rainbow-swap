import {FC} from 'react';

import styles from './history-data.module.css';
import {InfoRow} from './info-row/info-row';
import {ExternalLinkIcon} from '../../../../assets/icons/ExternalLinkIcon/ExternalLinkIcon';
import {SwapStatusEnum} from '../../../../enums/swap-status.enum';
import {useExplorerLinks} from '../../../../hooks/use-explorer-links.hook';
import {SwapHistoryData} from '../../../../store/interfaces/swap-history-data.interface';
import {Button} from '../../../button/button';
import {Skeleton} from '../../../skeleton/skeleton';

interface Props {
    historyData: SwapHistoryData;
    isLoading: boolean;
}

const ColorRecord: Record<SwapStatusEnum, string> = {
    [SwapStatusEnum.Pending]: '#3E88F7',
    [SwapStatusEnum.Success]: '#3E88F7',
    [SwapStatusEnum.Failed]: '#FF5B00',
    [SwapStatusEnum.PartiallyFilled]: '#FF5B00'
};

export const HistoryData: FC<Props> = ({historyData, isLoading}) => {
    const explorerLinks = useExplorerLinks();

    const color = ColorRecord[historyData.status];
    const transactionHref = explorerLinks.getTransactionLink(
        historyData.bocHash
    );

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                <Skeleton isLoading={isLoading}>
                    <p className={styles.status} style={{color}}>
                        {historyData.status}
                        {historyData.status === SwapStatusEnum.Pending && (
                            <div className={styles.loader_spinner} />
                        )}
                    </p>
                </Skeleton>
                <Skeleton isLoading={isLoading}>
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
                </Skeleton>
            </div>
            <InfoRow
                description="Sent"
                infoArray={[historyData.sentInfo]}
                isLoading={isLoading}
            />
            <InfoRow
                description="Received"
                infoArray={[historyData.receivedInfo]}
                isLoading={isLoading}
            />
            <InfoRow
                description="Returned"
                infoArray={[historyData.returnedInfo]}
                isLoading={isLoading}
                tooltipText="These tokens were returned due to a sudden price change during the swap"
            />
            <InfoRow
                description="Received intermediate tokens"
                infoArray={historyData.intermediateTokensInfo}
                isLoading={isLoading}
                tooltipText="You didn’t receive the final token because of a sudden price change during the swap"
            />
        </div>
    );
};
