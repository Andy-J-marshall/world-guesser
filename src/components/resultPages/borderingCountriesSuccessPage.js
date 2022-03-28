import React, { useState } from 'react';
import Country from '../country';
import PlayButton from '../playButton';

function BorderingCountriesSuccessPage(props) {
    const incorrectGuesses = props.incorrectGuesses;
    const correctGuesses = props.correctGuesses;
    const name = props.name;
    const map = props.map;
    const incorrectCount = incorrectGuesses.length;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function startNewGame() {
        setNewGameStarted(true);
    }

    return (
        <div>
            {!newGameStarted && < div id='successful-bordering-countries-game' >
                {incorrectCount === 0 && <h5>Amazing! You found every bordering country of <a href={map}>{name}</a> with no incorrect answers!</h5>}
                {incorrectCount > 0
                    && <h5>Well done! You found the {correctGuesses.length} bordering countries of <a href={map}>{name}</a> with {incorrectCount} incorrect guesses.</h5>
                }
                {incorrectCount > 0 && <p>Incorrect answers: {incorrectGuesses.toString()}</p>}
            </div >}
            {!newGameStarted && <PlayButton
                callback={startNewGame}
                buttonText='Play again'
            />}
            {newGameStarted && <Country />}
        </div>
    )
}

export default BorderingCountriesSuccessPage;
