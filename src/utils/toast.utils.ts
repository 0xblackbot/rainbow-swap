import {toast} from 'react-toastify';

import {ToastErrorIcon} from '../assets/icons/toast-error-icon/toast-error-icon';
import {ToastSuccessIcon} from '../assets/icons/toast-success-icon/toast-success-icon';

export const showSuccessToast = (text: string) =>
    toast.success(text, {icon: ToastSuccessIcon});

export const showErrorToast = (text: string) =>
    toast.error(text, {icon: ToastErrorIcon});

export const showLoadingToast = (text: string) => toast.loading(text);
