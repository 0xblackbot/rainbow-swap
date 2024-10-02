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

const updateMainButton = () => {
    setTimeout(() => {
        if (PROPS_STACK.length !== 0) {
            const lastButtonProps = PROPS_STACK[PROPS_STACK.length - 1];

            window.Telegram.WebApp.MainButton.setText(lastButtonProps.text);
            window.Telegram.WebApp.MainButton.onClick(lastButtonProps.onClick);
        }
    }, 0);
};

interface Props {
    text: string;
    containerClassName?: string;
    onClick: () => void;
}

export const FormButton: FC<Props> = ({text, containerClassName, onClick}) => {
    const ID = useMemo(() => getQueryId(), []);

    useEffect(() => {
        const buttonPropsIndex = PROPS_STACK.findIndex(item => item.id === ID);

        if (buttonPropsIndex === -1) {
            // add to stack
            PROPS_STACK.push({id: ID, text, onClick});
        } else {
            // update stack
            PROPS_STACK[buttonPropsIndex].text = text;
            PROPS_STACK[buttonPropsIndex].onClick = onClick;
        }

        updateMainButton();

        return () => {
            // remove old onClick
            window.Telegram.WebApp.MainButton.offClick(onClick);
        };
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
