import {useContext} from 'react';

import {ReferralsModalContext} from './referrals-modal.context';

export const useOpenReferralsModal = () => useContext(ReferralsModalContext);
