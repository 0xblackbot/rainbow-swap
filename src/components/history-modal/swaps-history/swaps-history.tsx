import {EmptyFn} from '@rnw-community/shared';
import {FC, Fragment} from 'react';

import {HistoryData} from './history-data/history-data';
import styles from './swaps-history.module.css';
import {useSwapHistoryDataSelector} from '../../../store/wallet/wallet-selectors';
import {Button} from '../../button/button';
import {Divider} from '../../points-modal/social-tasks/divider/divider';

interface Props {
    onSwap: EmptyFn;
}

export const SwapsHistory: FC<Props> = ({onSwap}) => {
    const state = useSwapHistoryDataSelector();

    return (
        <div className={styles.container}>
            {state.data.length === 0 && (
                <Button size="s" mode="bezeled" onClick={onSwap}>
                    <span>Swap</span>
                </Button>
            )}

            {state.data.map((historyData, index) => (
                <Fragment key={historyData.bocHash}>
                    <HistoryData
                        historyData={historyData}
                        isLoading={state.isLoading}
                    />
                    {index !== state.data.length - 1 && <Divider />}
                </Fragment>
            ))}
        </div>
    );
};
