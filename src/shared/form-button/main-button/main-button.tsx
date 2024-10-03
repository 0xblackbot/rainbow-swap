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

const updateMainButton = (
    oldOnClick?: () => void,
    newText?: string,
    newOnClick?: () => void
) => {
    if (isDefined(oldOnClick)) {
        window.Telegram.WebApp.MainButton.offClick(oldOnClick);
    }

    if (isDefined(newText)) {
        window.Telegram.WebApp.MainButton.setText(newText);
    }

    if (isDefined(newOnClick)) {
        window.Telegram.WebApp.MainButton.onClick(newOnClick);
    }
};

export const MainButton: FC<MainButtonProps> = ({text, onClick}) => {
    const ID = useMemo(() => getQueryId(), []);

    useEffect(() => {
        const buttonStateIndex = BUTTONS_STACK.findIndex(
            item => item.id === ID
        );

        const isLast =
            buttonStateIndex === -1 || // new MainButton
            buttonStateIndex === BUTTONS_STACK.length - 1; // last MainButton update

        if (isLast) {
            updateMainButton(
                BUTTONS_STACK[BUTTONS_STACK.length - 1]?.onClick,
                text,
                onClick
            );
        }

        if (buttonStateIndex === -1) {
            // add to stack
            BUTTONS_STACK.push({id: ID, text, onClick});
        } else {
            // update stack
            BUTTONS_STACK[buttonStateIndex].text = text;
            BUTTONS_STACK[buttonStateIndex].onClick = onClick;
        }
    }, [ID, text, onClick]);

    useEffect(() => {
        return () => {
            const buttonStateIndex = BUTTONS_STACK.findIndex(
                item => item.id === ID
            );

            if (buttonStateIndex !== -1) {
                const isLast = buttonStateIndex === BUTTONS_STACK.length - 1;

                if (isLast) {
                    updateMainButton(
                        BUTTONS_STACK[buttonStateIndex]?.onClick,
                        BUTTONS_STACK[buttonStateIndex - 1]?.text,
                        BUTTONS_STACK[buttonStateIndex - 1]?.onClick
                    );
                }

                // remove from stack
                BUTTONS_STACK.splice(buttonStateIndex, 1);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
};
