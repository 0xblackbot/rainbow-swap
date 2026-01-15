import {EmptyFn} from '@rnw-community/shared';

export interface ModalProps {
    isOpen: boolean;
    onOpen?: EmptyFn;
    onClose: EmptyFn;
}
