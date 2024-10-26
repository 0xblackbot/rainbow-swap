import {useSelector} from '../store';
import {useWalletAddress} from './use-wallet-address.hook';
import {IS_TMA, TELEGRAM_APP_LINK, WEB_LINK} from '../globals';

export const useReferralLink = () => {
    const userRefHash = useSelector(
        ({pointsV2}) => pointsV2.walletPoints.data.refHash
    );
    const walletAddress = useWalletAddress();

    if (IS_TMA) {
        return `${TELEGRAM_APP_LINK}?startapp=${userRefHash}`;
    } else {
        return `${WEB_LINK}?r=${walletAddress}`;
    }
};
