import {Asset, AssetsListParams} from 'rainbow-swap-sdk';

import {PayloadWithRequest} from '../interfaces/payload-with-request.interface';
import {createActions} from '../utils/create-actions';

export const loadAssetsListActions = createActions<
    AssetsListParams & PayloadWithRequest,
    {list: Asset[]} & PayloadWithRequest,
    {error: string} & PayloadWithRequest
>('assets/LOAD_ASSETS_LIST');
