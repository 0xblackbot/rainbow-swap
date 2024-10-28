import {createAction} from '@reduxjs/toolkit';
import {Asset} from 'rainbow-swap-sdk';

import {GetAssetsListParams} from '../../types/get-assets-list.type';
import {PayloadWithRequest} from '../interfaces/payload-with-request.interface';
import {createActions} from '../utils/create-actions';

export const loadAssetsListActions = createActions<
    GetAssetsListParams & PayloadWithRequest,
    {list: Asset[]} & PayloadWithRequest,
    {error: string} & PayloadWithRequest
>('assets/LOAD_ASSETS_LIST');

export const setAssetsListSearchValue = createAction<string>(
    'assets/SET_ASSETS_LIST_SEARCH_VALUE'
);
