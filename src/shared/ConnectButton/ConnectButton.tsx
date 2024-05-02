import {FC} from 'react';

interface Props {
    onClick: () => void;
    text: string;
    className?: string;
}

export const ConnectButton: FC<Props> = ({onClick, text, className}) => (
    <button onClick={onClick} className={className}>
        {text}
    </button>
);
