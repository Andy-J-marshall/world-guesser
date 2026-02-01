import { useState } from 'react';
import Country from './Country';
import Button from '../ui/Button';

interface StartNewGameProps {
  countriesInfo: any;
  buttonText: string;
  callback: () => void;
}

function StartNewGame(props: StartNewGameProps) {
    const countriesInfo = props.countriesInfo;
    const buttonText = props.buttonText;
    const newGameStartedCallback = props.callback;

    const [newGameStarted, setNewGameStarted] = useState(false);

    async function startNewGame() {
        setNewGameStarted(true);
        newGameStartedCallback();
    }

    return (
        <div id='start-new-game'>
            {!newGameStarted && <Button
                callback={startNewGame}
                buttonText={buttonText}
            />}
            {newGameStarted && <Country
                countriesInfo={countriesInfo}
            />}
        </div>
    )
}

export default StartNewGame;
