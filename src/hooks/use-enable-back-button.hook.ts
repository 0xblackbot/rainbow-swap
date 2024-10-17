import {EmptyFn} from '@rnw-community/shared';
import {useEffect} from 'react';

export const useEnableBackButton = (isVisible: boolean, onClick: EmptyFn) => {
    useEffect(() => {
        if (isVisible) {
            window.Telegram.WebApp.BackButton.show();
            window.Telegram.WebApp.BackButton.onClick(onClick);

            return () => {
                window.Telegram.WebApp.BackButton.hide();
                window.Telegram.WebApp.BackButton.offClick(onClick);
            };
        }
    }, [isVisible, onClick]);
};
