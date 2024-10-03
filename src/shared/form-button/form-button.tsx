import {isDefined} from '@rnw-community/shared';
import {getQueryId} from 'rainbow-swap-sdk';
import {FC, useEffect, useMemo} from 'react';

import styles from './form-button.module.css';
import {IS_IOS} from '../../globals';

interface ButtonProps {
    id: number;
    text: string;
    onClick: () => void;
}

const BUTTON_PROPS_STACK: ButtonProps[] = [];
let activeButtonProps: ButtonProps | undefined;

// let i = 0;
// setInterval(() => {
//     i++;
//     window.Telegram.WebApp.MainButton.setText(`test ${i}`);
// }, 1000);

const updateMainButton = () => {
    setTimeout(() => {
        const nextButtonProps =
            BUTTON_PROPS_STACK[BUTTON_PROPS_STACK.length - 1];

        // remove previous ButtonProps
        if (isDefined(activeButtonProps)) {
            // window.Telegram.WebApp.MainButton.setText('_');
            window.Telegram.WebApp.MainButton.offClick(
                activeButtonProps.onClick
            );
        }

        // set new ButtonProps
        activeButtonProps = nextButtonProps;

        if (isDefined(activeButtonProps)) {
            window.Telegram.WebApp.MainButton.setText(
                activeButtonProps.text + ' ' + getQueryId()
            );
            window.Telegram.WebApp.MainButton.onClick(
                activeButtonProps.onClick
            );
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
        const buttonPropsIndex = BUTTON_PROPS_STACK.findIndex(
            item => item.id === ID
        );

        if (buttonPropsIndex === -1) {
            // add to stack
            BUTTON_PROPS_STACK.push({id: ID, text, onClick});
        } else {
            // update stack
            BUTTON_PROPS_STACK[buttonPropsIndex].text = text;
            BUTTON_PROPS_STACK[buttonPropsIndex].onClick = onClick;
        }

        updateMainButton();
    }, [ID, text, onClick]);

    useEffect(() => {
        // const prevMainButtonText = window.Telegram.WebApp.MainButton.text;
        //
        // window.Telegram.WebApp.MainButton.setParams({
        //     text
        // });
        // window.Telegram.WebApp.ready();

        return () => {
            // window.Telegram.WebApp.MainButton.setParams({
            //     text: prevMainButtonText
            // });
            // window.Telegram.WebApp.ready();

            const buttonPropsIndex = BUTTON_PROPS_STACK.findIndex(
                item => item.id === ID
            );

            if (buttonPropsIndex !== -1) {
                // remove from stack
                BUTTON_PROPS_STACK.splice(buttonPropsIndex, 1);
            }

            updateMainButton();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        !IS_IOS && (
            <div className={containerClassName}>
                <button className={styles.button} onClick={onClick}>
                    {text}
                </button>
            </div>
        )
    );
};
