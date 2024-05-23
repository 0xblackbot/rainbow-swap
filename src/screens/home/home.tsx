import {SwapForm} from './swap-form/swap-form.tsx';
import {SwapRouteDisclaimer} from './swap-route-info/swap-route-disclaimer/swap-route-disclaimer.tsx';
import {SwapRouteInfo} from './swap-route-info/swap-route-info.tsx';

export const Home = () => (
    <>
        <SwapForm />
        <SwapRouteInfo />
        <SwapRouteDisclaimer />
    </>
);
