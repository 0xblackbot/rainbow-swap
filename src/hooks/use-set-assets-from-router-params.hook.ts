import {isDefined} from '@rnw-community/shared';
import {Asset} from 'rainbow-swap-sdk';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {useDispatch} from '../store';
import {useAssetsRecordSelector} from '../store/assets/assets-selectors';
import {assetsInitializedAction} from '../store/initialized/runtime-actions';
import {useIsAssetsInitializedSelector} from '../store/initialized/runtime-selectors';
import {findAssetBySlug} from '../utils/asset.utils';

export const useSyncSwapFormWithRouter = (
    inputAsset: Asset,
    outputAsset: Asset,
    setInputAssetAddress: Dispatch<SetStateAction<string>>,
    setOutputAssetAddress: Dispatch<SetStateAction<string>>
) => {
    const [isSynced, setIsSynced] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const assetsRecord = useAssetsRecordSelector();
    const isAssetsInitialized = useIsAssetsInitializedSelector();

    useEffect(() => {
        if (isSynced === false) {
            // skip Arbitrage mode
            if (params.inputAssetSlug === params.outputAssetSlug) {
                setIsSynced(true);

                return;
            }

            const inputAsset = findAssetBySlug(
                params.inputAssetSlug,
                assetsRecord
            );
            const outputAsset = findAssetBySlug(
                params.outputAssetSlug,
                assetsRecord
            );

            if (isDefined(inputAsset) && isDefined(outputAsset)) {
                setIsSynced(true);

                // remove skeleton from AssetsSelector
                dispatch(assetsInitializedAction());

                setInputAssetAddress(inputAsset.address);
                setOutputAssetAddress(outputAsset.address);
            } else {
                if (isAssetsInitialized) {
                    setIsSynced(true);

                    return;
                }
            }
        }
    }, [
        isSynced,
        assetsRecord,
        isAssetsInitialized,
        params.inputAssetSlug,
        params.outputAssetSlug,
        setInputAssetAddress,
        setOutputAssetAddress,
        dispatch
    ]);

    useEffect(() => {
        if (isSynced === true) {
            navigate(`/${inputAsset.slug}/${outputAsset.slug}`, {
                replace: true
            });
        }
    }, [isSynced, navigate, inputAsset.slug, outputAsset.slug]);
};
