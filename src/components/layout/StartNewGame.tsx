import Button from '../ui/Button';

interface StartNewGameProps {
    buttonText: string;
}

function StartNewGame({ buttonText }: StartNewGameProps) {
    async function startNewGame() {
        window.location.reload();
    }

    return <Button callback={startNewGame} buttonText={buttonText} />;
}

export default StartNewGame;
