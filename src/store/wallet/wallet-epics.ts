import {Address} from '@ton/ton';
import axios from 'axios';
import {Epic, combineEpics} from 'redux-observable';
import {Observable, switchMap, from, map, catchError, of} from 'rxjs';
import {Action} from 'ts-action';
import {toPayload, ofType} from 'ts-action-operators';

import {
    addPendingSwapTransactionActions,
    checkIsRainbowWalletActiveActions,
    loadBalancesActions
} from './wallet-actions';
import {TON_CLIENT, WORKCHAIN} from '../../globals.ts';
import {BalancesArray} from '../../interfaces/balance-object.interface';
import {RainbowWalletContract} from '../../swap-routes/rainbow/rainbow-wallet.contract.ts';
import {BalancesRecord} from '../../types/balances-record.type';
import {fromNano} from '../../utils/big-int.utils';
import {waitTransactionConfirmation} from '../../utils/tonapi.utils';

const walletEpic = (action$: Observable<Action>) =>
    action$.pipe(
        ofType(loadBalancesActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                axios.get<BalancesArray>(
                    `https://tonapi.io/v2/accounts/${payload}/jettons`
                )
            ).pipe(
                map(response => {
                    const balancesRecord: BalancesRecord = {};
                    response.data.balances.forEach(balanceObject => {
                        const parsedAddress = Address.parse(
                            balanceObject.jetton.address
                        ).toString();

                        balancesRecord[parsedAddress] = fromNano(
                            balanceObject.balance,
                            balanceObject.jetton.decimals
                        );
                    });

                    return balancesRecord;
                }),
                map(balancesRecord =>
                    loadBalancesActions.success(balancesRecord)
                ),
                catchError(error => of(loadBalancesActions.fail(error.message)))
            )
        )
    );

const addPendingSwapTransactionEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(addPendingSwapTransactionActions.submit),
        toPayload(),
        switchMap(payload =>
            from(
                waitTransactionConfirmation(
                    payload.senderRawAddress,
                    payload.bocHash
                )
            ).pipe(
                map(() => addPendingSwapTransactionActions.success()),
                catchError(err =>
                    of(addPendingSwapTransactionActions.fail(err.message))
                )
            )
        )
    );

const checkIsRainbowWalletActiveEpic: Epic<Action> = action$ =>
    action$.pipe(
        ofType(checkIsRainbowWalletActiveActions.submit),
        toPayload(),
        switchMap(payload => {
            const walletAddress = Address.parse(payload);

            const rainbowWallet = RainbowWalletContract.create({
                workchain: WORKCHAIN,
                ownerAddress: walletAddress
            });

            const contractProvider = TON_CLIENT.provider(rainbowWallet.address);

            return from(contractProvider.getState()).pipe(
                map(state =>
                    checkIsRainbowWalletActiveActions.success(
                        state.state.type === 'active'
                    )
                ),
                catchError(err =>
                    of(checkIsRainbowWalletActiveActions.fail(err.message))
                )
            );
        })
    );

export const walletEpics = combineEpics(
    walletEpic,
    addPendingSwapTransactionEpic,
    checkIsRainbowWalletActiveEpic
);
