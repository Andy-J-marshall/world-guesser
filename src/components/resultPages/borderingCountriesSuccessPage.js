import React, { useState } from 'react';
import Country from '../country';
import PlayButton from '../playButton';

function BorderingCountriesSuccessPage(props) {
    const incorrectGuesses = props.incorrectGuesses;
    const correctGuesses = props.correctGuesses;
    const name = props.name;
    const map = props.map;
    const incorrectCount = incorrectGuesses.length;
    const messageText = correctGuesses.length === 1 ? `You found the only bordering country` : `You found the ${correctGuesses.length} bordering countries`;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function startNewGame() {
        setNewGameStarted(true);
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
            {!newGameStarted && <PlayButton
                callback={startNewGame}
                buttonText='Play again'
            />}
            {newGameStarted && <Country />}
        </div>
    )
}

export default BorderingCountriesSuccessPage;
