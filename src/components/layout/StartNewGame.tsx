import Button from '../ui/Button';

interface StartNewGameProps {
    buttonText: string;
    variant?: 'light' | 'primary';
}

function StartNewGame({ buttonText, variant = 'light' }: StartNewGameProps) {
    async function startNewGame() {
        window.location.reload();
    }

    return <Button callback={startNewGame} buttonText={buttonText} variant={variant} />;
}

export default StartNewGame;
