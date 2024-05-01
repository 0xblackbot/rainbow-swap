import {FC} from 'react';

interface Props {
    text: string;
    onClick?: () => void;
    type: 'submit' | 'button';
    className?: string;
}

export const FormButton: FC<Props> = ({text, type, onClick, className}) => (
    <button type={type} className={className} onClick={onClick}>
        {text}
    </button>
);
