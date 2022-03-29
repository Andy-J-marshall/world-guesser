import React, { useState } from 'react';
import Country from '../country';
import PlayButton from '../playButton';
import getAllCountriesRequest from '../../restHelpers/allCountriesRequest';

function BorderingCountriesSuccessPage(props) {
    const incorrectGuesses = props.incorrectGuesses;
    const correctGuesses = props.correctGuesses;
    const name = props.name;
    const map = props.map;
    const guesses = props.guesses;
    const incorrectCount = incorrectGuesses.length;

    const messageText = correctGuesses.length === 1
        ? `Well done! You found the only bordering country of ${name} with ${incorrectCount} incorrect answer`
        : `Well done! You found the ${correctGuesses.length} bordering countries of ${name} with ${incorrectCount} incorrect answers`;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [allCountriesResponse, setAllCountriesResponse] = useState();

    async function startNewGame() {
        setNewGameStarted(true);
        const response = await getAllCountriesRequest();
        setAllCountriesResponse(response);
    }

    return (
        <div>
            {!newGameStarted && < div id='successful-bordering-countries-game' >
                <h5>{messageText}</h5>
                <p>See <a href={map}>{name}</a> on the map</p>
                {<p>Your answer history was: {guesses.toString()}</p>}
            </div >}

            {!newGameStarted && <br />}

            {!newGameStarted && <PlayButton
                callback={startNewGame}
                buttonText='Play again'
            />}
            {newGameStarted && allCountriesResponse && <Country
                countriesInfo={allCountriesResponse}
            />}
        </div>
    )
}

export default BorderingCountriesSuccessPage;
