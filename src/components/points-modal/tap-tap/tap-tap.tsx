import React, {useState} from 'react';

import coinImage from './coin.png';
import styles from './tap-tap.module.css';
import {Click} from '../../../interfaces/click.interface';
import {useDispatch} from '../../../store';
import {addTapActions} from '../../../store/points/points-actions';
import {getClassName} from '../../../utils/style.utils';

export const TapTap = () => {
    const dispatch = useDispatch();

    const [isPressed, setIsPressed] = useState(false);
    const [clicks, setClicks] = useState<Click[]>([]);

    const handlePressStart = () => setIsPressed(true);
    const handlePressEnd = () => setIsPressed(false);
    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('soft');

        const rect = event.currentTarget.getBoundingClientRect();

        const newClick: Click = {
            id: Date.now(),
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };

        setClicks(prevClicks => prevClicks.concat([newClick]));
        dispatch(addTapActions.submit(newClick));
    };
    const handleAnimationEnd = (id: number) => {
        setClicks(prevClicks => prevClicks.filter(click => click.id !== id));
    };

    return (
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
                alt="Coin icon that can be tapped to earn points"
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
    );
};
