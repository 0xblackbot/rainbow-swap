import {isDefined} from '@rnw-community/shared';
import {Asset} from 'rainbow-swap-sdk';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {useAssetsRecordSelector} from '../store/assets/assets-selectors';
import {useIsAssetInitializedSelector} from '../store/initialized/initialized-selectors';
import {findAssetBySlug} from '../utils/asset.utils';

export const useSyncSwapFormWithRouter = (
    inputAsset: Asset,
    outputAsset: Asset,
    setInputAssetAddress: Dispatch<SetStateAction<string>>,
    setOutputAssetAddress: Dispatch<SetStateAction<string>>
) => {
    const isSynced = useRef(false);

    const navigate = useNavigate();
    const params = useParams();

    const assetsRecord = useAssetsRecordSelector();
    const isAssetInitialized = useIsAssetInitializedSelector();

    useEffect(() => {
        if (isSynced.current === false && isAssetInitialized) {
            isSynced.current = true;

            const inputAsset = findAssetBySlug(
                params.inputAssetSlug,
                assetsRecord
            );
            const outputAsset = findAssetBySlug(
                params.outputAssetSlug,
                assetsRecord
            );

            if (isDefined(inputAsset) && isDefined(outputAsset)) {
                setInputAssetAddress(inputAsset.address);
                setOutputAssetAddress(outputAsset.address);
            }
        }
    }, [
        isSynced,
        assetsRecord,
        isAssetInitialized,
        params.inputAssetSlug,
        params.outputAssetSlug,
        setInputAssetAddress,
        setOutputAssetAddress
    ]);

    useEffect(() => {
        if (isSynced.current === true) {
            navigate(`/${inputAsset.slug}/${outputAsset.slug}`, {
                replace: true
            });
        }
    }, [navigate, inputAsset.slug, outputAsset.slug]);
};
