import Button from "../ui/Button";

interface StartNewGameProps {
  buttonText: string;
  callback: () => void;
}

function StartNewGame(props: StartNewGameProps) {
  const buttonText = props.buttonText;

  async function startNewGame() {
    window.location.reload();
  }

  return <Button callback={startNewGame} buttonText={buttonText} />;
}

export default StartNewGame;
