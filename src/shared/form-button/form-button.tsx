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
        // add ButtonProps onMount
        PROPS_STACK.push({id: ID, text, onClick});

        // remove ButtonProps onUnmount
        return () => {
            const buttonPropsIndex = PROPS_STACK.findIndex(
                item => item.id === ID
            );

            if (buttonPropsIndex !== -1) {
                const buttonProps = PROPS_STACK[buttonPropsIndex];

                // remove old onClick
                window.Telegram.WebApp.MainButton.offClick(buttonProps.onClick);

                PROPS_STACK.splice(buttonPropsIndex, 1);

                if (PROPS_STACK.length === 0) {
                    // don't know that to do
                } else {
                    const lastButtonProps = PROPS_STACK[PROPS_STACK.length - 1];

                    window.Telegram.WebApp.MainButton.setText(
                        lastButtonProps.text
                    );
                    window.Telegram.WebApp.MainButton.onClick(
                        lastButtonProps.onClick
                    );
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const buttonPropsIndex = PROPS_STACK.findIndex(item => item.id === ID);

        if (buttonPropsIndex !== -1) {
            const buttonProps = PROPS_STACK[buttonPropsIndex];

            // update if last
            if (buttonPropsIndex === PROPS_STACK.length - 1) {
                // remove old onClick
                window.Telegram.WebApp.MainButton.offClick(buttonProps.onClick);

                window.Telegram.WebApp.MainButton.setText(text);
                window.Telegram.WebApp.MainButton.onClick(onClick);
            }

            buttonProps.text = text;
            buttonProps.onClick = onClick;
        }
    }, [ID, text, onClick]);

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
