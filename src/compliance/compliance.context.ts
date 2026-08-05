import {createContext} from 'react';

export interface ComplianceContextValue {
    isAccepted: boolean;
    requireAcceptance: () => boolean;
}

export const ComplianceContext = createContext<
    ComplianceContextValue | undefined
>(undefined);
