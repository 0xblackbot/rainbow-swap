import {createContext} from 'react';

interface ViewportHeightContextValues {
    value: number;
    updateValue: () => void;
}

export const ViewportHeightContext = createContext<ViewportHeightContextValues>(
    {
        value: 0,
        updateValue: () => void 0
    }
);
