interface FormButtonProps {
    text: string;
    onClick?: () => void;
    type: 'submit' | 'button';
    className?: string;
}

const FormButton = ({text, type, onClick, className}: FormButtonProps) => {
    return (
        <button type={type} className={className} onClick={onClick}>
            {text}
        </button>
    );
};

export default FormButton;
