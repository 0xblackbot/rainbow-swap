import {useMemo} from 'react';

import {useSelector} from '../index';

export const useAssetsRecordSelector = () =>
    useSelector(({assets}) => assets.record.data);

export const useAssetsListSelector = () => {
    const assetsRecord = useSelector(({assets}) => assets.record.data);

    return useMemo(() => Object.values(assetsRecord), [assetsRecord]);
};
