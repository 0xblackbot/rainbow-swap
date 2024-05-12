import {useCallback, useMemo, useState} from 'react';

import {DEFAULT_ASSETS_LIST} from '../data/default-asset-list.ts';
import {getAssetsList} from '../utils/api.utils.ts';

export const useAssets = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(DEFAULT_ASSETS_LIST);

    const loadData = useCallback(async () => {
        setIsLoading(true);

        const newAssetsList = await getAssetsList();

        setData(newAssetsList);
        setIsLoading(false);
    }, []);

    // const updateAssetsWithBalances = useCallback(
    //     async (walletAddress: string) => {
    //         try {
    //             const balancesResponse = await axios.get<BalancesArray>(
    //                 `https://tonapi.io/v2/accounts/${walletAddress}/jettons`
    //             );
    //             const balances = balancesResponse.data.balances;
    //             setAssets(prevAssets => {
    //                 const updatedAssets = prevAssets.map(asset => {
    //                     const balance = balances.find(
    //                         balance =>
    //                             balance.jetton.symbol === asset.symbol &&
    //                             balance.jetton.name === asset.name
    //                     );
    //
    //                     return {
    //                         ...asset,
    //                         balance: fromNano(balance?.balance ?? 0n, asset.decimals)
    //                     };
    //                 });
    //                 updatedAssets.sort((a, b) => {
    //                     const balanceA = parseFloat(a.balance || '0');
    //                     const balanceB = parseFloat(b.balance || '0');
    //
    //                     return balanceB - balanceA;
    //                 });
    //
    //                 return updatedAssets;
    //             });
    //         } catch (error) {
    //             console.error('Failed to fetch wallet balances.', error);
    //         }
    //     },
    //     []
    // );

    return useMemo(
        () => ({isLoading, data, loadData}),
        [isLoading, data, loadData]
    );
};
