import {useSelector} from '../index.ts';

export const useAssetsRecordSelector = () =>
    useSelector(({assets}) => assets.record.data);
