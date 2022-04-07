import React, { useState } from 'react';
import Country from './country';
import PlayButton from './playButton';
import getAllCountriesRequest from '../helpers/allCountriesRequest';

function StartNewGame(props) {
    const buttonText = props.buttonText;
    const newGameStartedCallback = props.callback;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [allCountriesResponse, setAllCountriesResponse] = useState();

    // TODO would be nice not to have to redo this request every time! Pass in results from first request instead?
    async function startNewGame() {
        const response = await getAllCountriesRequest();
        setNewGameStarted(true);
        setAllCountriesResponse(response);
        newGameStartedCallback(true);
    }

    return (
        <div id='start-new-game'>
            {!newGameStarted && <br />}
            {!newGameStarted && <PlayButton
                callback={startNewGame}
                buttonText={buttonText}
            />}
            {newGameStarted && allCountriesResponse && <Country
                countriesInfo={allCountriesResponse}
            />}
        </div>
    )
}

export default StartNewGame;
