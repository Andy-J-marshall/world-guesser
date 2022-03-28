import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Country from '../country';

function FailurePage(props) {
    const name = props.name;
    const flag = props.flag;
    const map = props.map;
    const borderingCountriesCount = props.borderingCountriesCount;
    const correctGuesses = props.correctGuesses;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function startNewGame() {
        setNewGameStarted(true);
    }

    return (
        <div id='failure-page'>
            <p style={{ color: 'red' }}>YOU LOST</p>
            {!borderingCountriesCount && !newGameStarted && < div id='country-failure' >
                {<p>The answer was <a href={map}>{name}</a></p>}
                <img style={{ border: 'solid' }} src={flag} alt='Country Flag' />
            </div >}
            {borderingCountriesCount && !newGameStarted && < div id='bordering-countries-failure' >
                {/* TODO add this in: The missing countries were {guesses.filter(countryGuess => !answerCountries.includes(countryGuess)} */}
                <p>You found {correctGuesses.length} bordering countries out of {borderingCountriesCount}.</p>
                {correctGuesses.length > 0 && <p>Countries found: {correctGuesses.toString()}</p>}
                {<p>See {name} on the <a href={map}>map</a></p>}
            </div >}
            {!newGameStarted && <div id='retry-button'>
                <br />
                <Button variant='primary' size='lg' onClick={startNewGame}>Try again</Button>
            </div>}
            {newGameStarted && <Country />}
        </div>
    )
}

export default FailurePage;
