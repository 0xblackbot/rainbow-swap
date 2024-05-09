import axios from 'axios';
import {useContext} from 'react';

import {offlineAssetList} from '../../assets/offline-asset-list';
import {InputOutputContext} from '../../context/input-output.context';
import {BalancesArray} from '../../interfaces/balance-object.interface';

export const useAssetsHook = () => {
    const {setAssets} = useContext(InputOutputContext);

    const getAssets = async () => {
        try {
            const response = await axios.get(
                'http://localhost:3000/api/assets'
            );
            const data = response.data;
            setAssets(data);
        } catch (error) {
            console.error(
                'Failed to fetch assets. Using fallback assets.',
                error
            );
            setAssets(offlineAssetList);
        }
    };

    const getBestRoute = async (
        inputAssetAddress: string,
        outputAssetAddress: string,
        inputAssetAmount: bigint
    ) => {
        const response = await axios.get(
            'http://localhost:3000/api/best-route',
            {
                params: {
                    inputAssetAddress,
                    outputAssetAddress,
                    inputAssetAmount
                }
            }
        );

        const data = response.data;

        return data;
    };

    const updateAssetsWithBalances = async (walletAddress: string) => {
        try {
            const balancesResponse = await axios.get<BalancesArray>(
                `https://tonapi.io/v2/accounts/${walletAddress}/jettons`
            );
            const balances = balancesResponse.data.balances;
            setAssets(prevAssets => {
                const updatedAssets = prevAssets.map(asset => {
                    const balance = balances.find(
                        balance =>
                            balance.jetton.symbol === asset.symbol &&
                            balance.jetton.name === asset.name
                    );

                    return {
                        ...asset,
                        balance: balance
                            ? (
                                  parseFloat(balance.balance) /
                                  10 ** parseFloat(asset.decimals)
                              ).toString()
                            : '0'
                    };
                });

                updatedAssets.sort((a, b) => {
                    const balanceA = parseFloat(a.balance || '0');
                    const balanceB = parseFloat(b.balance || '0');

                    return balanceB - balanceA;
                });

                return updatedAssets;
            });
        } catch (error) {
            console.error('Failed to fetch wallet balances.', error);
        }
    };

    return {
        getAssets,
        getBestRoute,
        updateAssetsWithBalances
    };
};
