import {getQueryId} from 'rainbow-swap-sdk';
import {FC, useEffect, useMemo} from 'react';

import styles from './form-button.module.css';
import {IS_TMA} from '../../globals';

interface ButtonProps {
    id: number;
    text: string;
    onClick: () => void;
}

const PROPS_STACK: ButtonProps[] = [];

interface Props {
    text: string;
    containerClassName?: string;
    onClick: () => void;
}

export const FormButton: FC<Props> = ({text, containerClassName, onClick}) => {
    const ID = useMemo(() => getQueryId(), []);

    useEffect(() => {
        return () => {
            const buttonPropsIndex = PROPS_STACK.findIndex(
                item => item.id === ID
            );

            if (buttonPropsIndex !== -1) {
                // remove onClick
                window.Telegram.WebApp.MainButton.offClick(
                    PROPS_STACK[buttonPropsIndex].onClick
                );
                // remove from stack
                PROPS_STACK.splice(buttonPropsIndex, 1);

                if (PROPS_STACK.length === 0) {
                    // don't know that to do
                } else {
                    const newButtonProps = PROPS_STACK[PROPS_STACK.length - 1];

                    // update MainButton state
                    window.Telegram.WebApp.MainButton.setText(
                        newButtonProps.text
                    );
                    window.Telegram.WebApp.MainButton.onClick(
                        newButtonProps.onClick
                    );
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const buttonPropsIndex = PROPS_STACK.findIndex(item => item.id === ID);

        if (buttonPropsIndex === -1) {
            // add to stack
            PROPS_STACK.push({id: ID, text, onClick});

            // set MainButton
            window.Telegram.WebApp.MainButton.setText(text);
            window.Telegram.WebApp.MainButton.onClick(onClick);
        } else {
            // remove old onClick
            window.Telegram.WebApp.MainButton.offClick(
                PROPS_STACK[buttonPropsIndex].onClick
            );

            // update MainButton if last
            if (buttonPropsIndex === PROPS_STACK.length - 1) {
                window.Telegram.WebApp.MainButton.setText(text);
                window.Telegram.WebApp.MainButton.onClick(onClick);
            }

            // update stack
            PROPS_STACK[buttonPropsIndex].text = text;
            PROPS_STACK[buttonPropsIndex].onClick = onClick;
        }
    }, [ID, text, onClick]);

    useEffect(() => {
        return () => {
            const buttonPropsIndex = PROPS_STACK.findIndex(
                item => item.id === ID
            );

            if (buttonPropsIndex !== -1) {
                // remove from stack
                PROPS_STACK.splice(buttonPropsIndex, 1);
            }

            updateMainButton();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !IS_TMA && (
            <div className={containerClassName}>
                <button className={styles.button} onClick={onClick}>
                    {text}
                </button>
            </div>
        )
    );
};
