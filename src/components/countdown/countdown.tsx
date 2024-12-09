import {FC, useEffect, useState} from 'react';

interface Props {
    date: number;
    isActive?: boolean;
    placeholder?: string;
    className?: string;
}

export const Countdown: FC<Props> = ({
    date,
    isActive = true,
    placeholder,
    className
}) => {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const diff = date - now;

            if (diff <= 0) {
                setTimeLeft(
                    placeholder ??
                        new Date(date).toLocaleString(undefined, {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        })
                );
                clearInterval(timer);
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 0) {
                setTimeLeft(`${days} day${days > 1 ? 's' : ''} left`);
            } else {
                setTimeLeft(
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
                        .toString()
                        .padStart(2, '0')}`
                );
            }
        };

        if (isActive) {
            calculateTimeLeft();
            timer = setInterval(calculateTimeLeft, 1000);
        } else {
            setTimeLeft(
                new Date(date).toLocaleString(undefined, {
                    dateStyle: 'short',
                    timeStyle: 'short'
                })
            );
        }

        return () => clearInterval(timer);
    }, [date, isActive, placeholder]);

    return <p className={className}>{timeLeft}</p>;
};
