import {getBestRoute} from 'rainbow-swap-sdk';
import {combineEpics, Epic} from 'redux-observable';
import {from, of} from 'rxjs';
import {debounceTime, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Action} from 'ts-action';
import {ofType, toPayload} from 'ts-action-operators';

import {loadSwapRoutesActions} from './swap-routes-actions';
import {RiskTolerance} from '../../enums/risk-tolerance.enum';
import {DEBOUNCE_DUE_TIME} from '../../globals';
import {RootState} from '../index';
import {emptyBestRouteResponse} from './swap-routes-state';
import {sentryCatchError} from '../../utils/sentry.utils';
import {isTolFeePromo} from '../../utils/tol-fee.utils';

const loadSwapRoutesEpic: Epic<Action, Action, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(loadSwapRoutesActions.submit),
        toPayload(),
        debounceTime(DEBOUNCE_DUE_TIME),
        withLatestFrom(state$),
        switchMap(([payload, state]) => {
            if (payload.inputAssetAmount === '0') {
                return of(
                    loadSwapRoutesActions.success({
                        ...emptyBestRouteResponse,
                        requestId: payload.requestId
                    })
                );
            }

            const maxDepth =
                payload.inputAssetAddress === payload.outputAssetAddress
                    ? RiskTolerance.Risky
                    : payload.riskTolerance;
            const referralAddress =
                state.wallet.pointsState.walletPoints.data.refParent ??
                state.wallet.pointsState.refWallet ??
                undefined;
            const partnerId = isTolFeePromo(
                payload.inputAssetAddress,
                payload.outputAssetAddress
            )
                ? 'TolS7Promo'
                : undefined;

            return from(
                getBestRoute({
                    inputAssetAmount: payload.inputAssetAmount,
                    inputAssetAddress: payload.inputAssetAddress,
                    outputAssetAddress: payload.outputAssetAddress,
                    senderAddress: payload.senderAddress,
                    maxDepth,
                    maxSplits: payload.maxSplits,
                    maxSlippage: payload.maxSlippage,
                    referralAddress,
                    partnerId
                })
            ).pipe(
                map(response =>
                    loadSwapRoutesActions.success({
                        ...response,
                        requestId: payload.requestId
                    })
                ),
                sentryCatchError(err =>
                    of(
                        loadSwapRoutesActions.fail({
                            error: err.message,
                            requestId: payload.requestId
                        })
                    )
                )
            );
        })
    );

export const swapRoutesEpics = combineEpics(loadSwapRoutesEpic);
