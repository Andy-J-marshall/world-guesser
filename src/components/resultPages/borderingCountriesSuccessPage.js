import React, { useState } from 'react';
import Country from '../country';
import PlayButton from '../playButton';
import getAllCountriesRequest from '../../restHelpers/allCountriesRequest';

function BorderingCountriesSuccessPage(props) {
    const incorrectGuesses = props.incorrectGuesses;
    const correctGuesses = props.correctGuesses;
    const name = props.name;
    const map = props.map;
    const incorrectCount = incorrectGuesses.length;
    const messageText = correctGuesses.length === 1 ? `You found the only bordering country` : `You found the ${correctGuesses.length} bordering countries`;

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
                {incorrectCount === 0 && <h5>Amazing! {messageText} of <a href={map}>{name}</a> with no incorrect answers!</h5>}
                {incorrectCount > 0
                    && <h5>Well done! {messageText} of <a href={map}>{name}</a> with {incorrectCount} incorrect answer(s).</h5>
                }
                {incorrectCount > 0 && <p>Incorrect answer(s): {incorrectGuesses.toString()}</p>}
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
