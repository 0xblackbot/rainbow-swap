import {useSelector} from '../index.ts';

export const useBalancesSelector = () =>
    useSelector(({balances}) => balances.balances.data);
