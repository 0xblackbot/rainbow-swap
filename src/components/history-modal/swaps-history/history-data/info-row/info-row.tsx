import {isDefined} from '@rnw-community/shared';
import {FC, Fragment} from 'react';

import styles from './info-row.module.css';
import {SwapHistoryData} from '../../../../../store/interfaces/swap-history-data.interface';
import {formatNumber} from '../../../../../utils/format-number.utils';
import {Skeleton} from '../../../../skeleton/skeleton';

interface Props {
    description: string;
    infoArray?: (SwapHistoryData['sentInfo'] | undefined)[];
    isLoading: boolean;
}

export const InfoRow: FC<Props> = ({
    description,
    infoArray = [],
    isLoading
}) => {
    const filteredData = infoArray.filter(isDefined);

    if (filteredData.length === 0) {
        return null;
    }

    return (
        <div className={styles.row}>
            <Skeleton isLoading={isLoading}>
                <p className={styles.description}>{description}:</p>
            </Skeleton>
            <Skeleton isLoading={isLoading}>
                <div className={styles.row}>
                    {filteredData.map(info => (
                        <Fragment key={info.symbol}>
                            <p className={styles.asset_value}>
                                {formatNumber(info.amount, 2)} {info.symbol}
                            </p>

                            <p className={styles.usd_value}>
                                (${info.usdAmount.toFixed(2)})
                            </p>
                        </Fragment>
                    ))}
                </div>
            </Skeleton>
        </div>
    );
};
