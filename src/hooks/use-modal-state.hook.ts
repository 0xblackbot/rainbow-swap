import {useCallback, useMemo, useState} from 'react';

export const useModalState = () => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return useMemo(() => ({isOpen, open, close}), [close, isOpen, open]);
};
