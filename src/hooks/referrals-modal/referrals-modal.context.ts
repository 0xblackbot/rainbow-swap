import {EmptyFn, emptyFn} from '@rnw-community/shared';
import {createContext} from 'react';

type ReferralsModalContextValues = EmptyFn;

export const ReferralsModalContext =
    createContext<ReferralsModalContextValues>(emptyFn);
