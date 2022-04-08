import React, { useState } from 'react';
import Country from './country';
import PlayButton from './playButton';

function StartNewGame(props) {
    const countriesInfo = props.countriesInfo;
    const buttonText = props.buttonText;
    const newGameStartedCallback = props.callback;

    const [newGameStarted, setNewGameStarted] = useState(false);

    async function startNewGame() {
        setNewGameStarted(true);
        newGameStartedCallback(true);
    }

    return (
        <div id='start-new-game'>
            {!newGameStarted && <br />}
            {!newGameStarted && <PlayButton
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
