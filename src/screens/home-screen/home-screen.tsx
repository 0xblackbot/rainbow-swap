import {isNotEmptyString} from '@rnw-community/shared';
import {useTonAddress} from '@tonconnect/ui-react';
import {useEffect} from 'react';

import {Header} from '../../components/header/header.tsx';
import {useViewportHeight} from '../../hooks/viewport-height/viewport-height.hook.ts';
import {useDispatch} from '../../store';
import {loadAssetsActions} from '../../store/assets/assets-actions.ts';
import {loadBalancesActions} from '../../store/wallet/wallet-actions.ts';
import {SwapScreen} from '../home/swap-form/swap-form.tsx';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const walletAddress = useTonAddress();
    const viewportHeight = useViewportHeight();

    useEffect(() => {
        viewportHeight.updateValue();

        dispatch(loadAssetsActions.submit());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, viewportHeight.updateValue]);

    useEffect(() => {
        if (isNotEmptyString(walletAddress)) {
            dispatch(loadBalancesActions.submit(walletAddress));
        }
    }, [dispatch, walletAddress]);

    return (
        <>
            <Header />
            <SwapScreen />
        </>
    );
};
