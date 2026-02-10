import Button from '../ui/Button';

interface StartNewGameProps {
    buttonText: string;
    variant?: 'light' | 'primary';
    onReset: () => void;
}

function StartNewGame({ buttonText, variant = 'light', onReset }: StartNewGameProps) {
    return <Button callback={onReset} buttonText={buttonText} variant={variant} />;
}

export default StartNewGame;
