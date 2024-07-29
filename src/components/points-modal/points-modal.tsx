import React, {useState} from 'react';

import coinImage from './coin.png';
import styles from './points-modal.module.css';
import {Click} from '../../interfaces/click.interface';
import {BottomSheet} from '../../shared/bottom-sheet/bottom-sheet';
import {FormButton} from '../../shared/form-button/form-button';
import {useDispatch} from '../../store';
import {closePointsModal} from '../../store/points/points-actions';
import {useIsPointsModalOpenSelector} from '../../store/points/points-selectors';
import {getClassName} from '../../utils/style.utils';

export const PointsModal = () => {
    const dispatch = useDispatch();
    const isOpen = useIsPointsModalOpenSelector();

    const [isPressed, setIsPressed] = useState(false);
    const [clicks, setClicks] = useState<Click[]>([]);

    const handleClose = () => dispatch(closePointsModal());
    const handlePressStart = () => setIsPressed(true);
    const handlePressEnd = () => setIsPressed(false);
    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');

        const rect = event.currentTarget.getBoundingClientRect();

        setClicks(prevClicks =>
            prevClicks.concat([
                {
                    id: Date.now(),
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                }
            ])
        );
    };
    const handleAnimationEnd = (id: number) => {
        setClicks(prevClicks => prevClicks.filter(click => click.id !== id));
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            headerTitle="Tap-tap"
            onClose={handleClose}
        >
            <div className={styles.content_container}>
                <div
                    className={styles.coin_container}
                    onClick={handleClick}
                    onMouseDown={handlePressStart}
                    onMouseUp={handlePressEnd}
                    onMouseLeave={handlePressEnd}
                    onTouchStart={handlePressStart}
                    onTouchEnd={handlePressEnd}
                    onTouchCancel={handlePressEnd}
                >
                    <img
                        src={coinImage}
                        alt="coin"
                        draggable={false}
                        className={getClassName(
                            styles.coin_image,
                            isPressed ? styles.coin_image_pressed : ''
                        )}
                    />
                    {clicks.map(click => (
                        <div
                            key={click.id}
                            className={styles.click}
                            style={{
                                top: click.y,
                                left: click.x
                            }}
                            onAnimationEnd={() => handleAnimationEnd(click.id)}
                        >
                            +1
                        </div>
                    ))}
                </div>
                <FormButton
                    text="Swap"
                    containerClassName={styles.swap_button}
                    onClick={handleClose}
                ></FormButton>
            </div>
        </BottomSheet>
    );
};
