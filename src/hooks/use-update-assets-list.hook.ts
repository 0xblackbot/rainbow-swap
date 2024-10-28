import {getQueryId} from 'rainbow-swap-sdk';
import {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {useDispatch} from '../store';
import {loadAssetsListActions} from '../store/assets/assets-actions';
import {useAssetsSearchValueSelector} from '../store/initialized/runtime-selectors';
import {useUserAssetsSelector} from '../store/wallet/wallet-selectors';

export const useUpdateAssetsList = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const initialInputAssetSlug = useRef(params.inputAssetSlug);
    const initialOutputAssetSlug = useRef(params.outputAssetSlug);

    const userAssets = useUserAssetsSelector();
    const searchValue = useAssetsSearchValueSelector();

    useEffect(() => {
        dispatch(
            loadAssetsListActions.submit({
                userAssets: [
                    initialInputAssetSlug.current ?? '',
                    initialOutputAssetSlug.current ?? '',
                    ...userAssets
                ],
                searchValue,
                requestId: getQueryId().toString()
            })
        );
    }, [dispatch, userAssets, searchValue]);
};
