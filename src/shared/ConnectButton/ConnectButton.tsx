interface ConnectButtonProps {
    onClick: () => void;
    text: string;
    className?: string;
}

const ConnectButton = ({onClick, text, className}: ConnectButtonProps) => {
    return (
        <button onClick={onClick} className={className}>
            {text}
        </button>
    );
};

export default ConnectButton;
