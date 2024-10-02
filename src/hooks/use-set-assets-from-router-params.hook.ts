import {isDefined} from '@rnw-community/shared';
import {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';

import {useAssetsRecordSelector} from '../store/assets/assets-selectors';
import {useIsAssetInitializedSelector} from '../store/initialized/initialized-selectors';
import {findAssetBySlug} from '../utils/asset.utils';

export const useSetAssetsFromRouterParams = (
    setInputAssetAddress: Dispatch<SetStateAction<string>>,
    setOutputAssetAddress: Dispatch<SetStateAction<string>>
) => {
    const params = useParams();
    const hasSetParams = useRef(false);

    const assetsRecord = useAssetsRecordSelector();
    const isAssetInitialized = useIsAssetInitializedSelector();

    useEffect(() => {
        if (hasSetParams.current === false && isAssetInitialized) {
            hasSetParams.current = true;

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
        assetsRecord,
        isAssetInitialized,
        params.inputAssetSlug,
        params.outputAssetSlug,
        setInputAssetAddress,
        setOutputAssetAddress
    ]);
};
