import {EmptyFn} from '@rnw-community/shared';
import {FC} from 'react';

import styles from './referrals-modal.module.css';
import {ReferrerStats} from './referrer-stats/referrer-stats';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';

interface Props {
    isOpen: boolean;
    onClose: EmptyFn;
}

export const ReferralsModal: FC<Props> = ({isOpen, onClose}) => (
    <BottomSheet isOpen={isOpen} headerTitle="Rewards Center" onClose={onClose}>
        <div className={styles.content_container}>
            <ReferrerStats />
        </div>
        <FormButton
            text="Close"
            containerClassName={styles.footer_container}
            onClick={onClose}
        ></FormButton>
    </BottomSheet>
);
