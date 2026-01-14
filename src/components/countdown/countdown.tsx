import {FC, useEffect, useMemo, useState} from 'react';

interface Props {
    date: number;
    isActive?: boolean;
    placeholder?: string;
    className?: string;
}

const formatTarget = (date: number, placeholder?: string) =>
    placeholder ??
    new Date(date).toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short'
    });

const computeCountdownText = (date: number, placeholder?: string) => {
    const now = Date.now();
    const diff = date - now;

    if (diff <= 0) return formatTarget(date, placeholder);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;

    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const Countdown: FC<Props> = ({
    date,
    isActive = true,
    placeholder,
    className
}) => {
    const inactiveText = useMemo(
        () => formatTarget(date, placeholder),
        [date, placeholder]
    );

    const [timeLeft, setTimeLeft] = useState(() =>
        isActive ? computeCountdownText(date, placeholder) : inactiveText
    );

    useEffect(() => {
        if (!isActive) return;

        const tick = () => {
            const next = computeCountdownText(date, placeholder);
            setTimeLeft(next);

            if (Date.now() >= date) {
                clearInterval(id);
            }
        };

        const id = window.setInterval(tick, 1000);

        return () => window.clearInterval(id);
    }, [date, isActive, placeholder]);

    const text = isActive ? timeLeft : inactiveText;

    return <p className={className}>{text}</p>;
};
