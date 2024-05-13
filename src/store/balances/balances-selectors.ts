import {useSelector} from '../index.ts';

export const useBalancesListSelector = () =>
    useSelector(({balances}) => balances.balances.data);
