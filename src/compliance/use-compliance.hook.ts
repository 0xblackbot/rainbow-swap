import {useContext} from 'react';

import {ComplianceContext} from './compliance.context';

export const useCompliance = () => {
    const context = useContext(ComplianceContext);

    if (!context) {
        throw new Error('useCompliance must be used inside ComplianceProvider');
    }

    return context;
};
