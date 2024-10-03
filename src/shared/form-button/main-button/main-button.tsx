import {isDefined} from '@rnw-community/shared';
import {getQueryId} from 'rainbow-swap-sdk';
import {FC, useEffect, useMemo} from 'react';

import {MainButtonProps} from './main-button.props';

interface MainButtonState {
    id: number;
    text: string;
    onClick: () => void;
}

const BUTTONS_STACK: MainButtonState[] = [];
let activeButtonState: MainButtonState | undefined;

const updateMainButton = () => {
    // remove previous MainButtonState
    if (isDefined(activeButtonState)) {
        window.Telegram.WebApp.MainButton.offClick(activeButtonState.onClick);
    }

    // set new MainButtonState
    activeButtonState = BUTTONS_STACK[BUTTONS_STACK.length - 1];

    if (isDefined(activeButtonState)) {
        window.Telegram.WebApp.MainButton.setText(activeButtonState.text);
        window.Telegram.WebApp.MainButton.onClick(activeButtonState.onClick);
    }
};

export const MainButton: FC<MainButtonProps> = ({text, onClick}) => {
    const ID = useMemo(() => getQueryId(), []);

    useEffect(() => {
        const buttonStateIndex = BUTTONS_STACK.findIndex(
            item => item.id === ID
        );

        if (buttonStateIndex === -1) {
            // add to stack
            BUTTONS_STACK.push({id: ID, text, onClick});
        } else {
            // update stack
            BUTTONS_STACK[buttonStateIndex].text = text;
            BUTTONS_STACK[buttonStateIndex].onClick = onClick;
        }

        updateMainButton();
    }, [ID, text, onClick]);

    useEffect(() => {
        return () => {
            const buttonStateIndex = BUTTONS_STACK.findIndex(
                item => item.id === ID
            );

            if (buttonStateIndex !== -1) {
                // remove from stack
                BUTTONS_STACK.splice(buttonStateIndex, 1);
            }

            updateMainButton();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};
