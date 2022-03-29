import React, { useState } from 'react';
import Country from '../country';
import PlayButton from '../playButton';
import getAllCountriesRequest from '../../restHelpers/allCountriesRequest';

function FailurePage(props) {
    const name = props.name;
    const flag = props.flag;
    const map = props.map;
    const borderingCountries = props.borderingCountries;
    const correctGuesses = props.correctGuesses;
    const guesses = props.guesses;

    const borderingCountriesCount = borderingCountries.length;
    const missingAnswersArray = borderingCountries.filter(countryGuess => !correctGuesses.includes(countryGuess.toLowerCase()));

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [allCountriesResponse, setAllCountriesResponse] = useState();

    async function startNewGame() {
        setNewGameStarted(true);
        const response = await getAllCountriesRequest();
        setAllCountriesResponse(response);
    }

    return (
        <div id='failure-page'>
            {!newGameStarted && <p style={{ color: 'red' }}>Unlucky, better luck next time</p>}
            {!borderingCountriesCount && !newGameStarted && < div id='country-failure' >
                {<p>The answer was <a href={map}>{name}</a></p>}
                {<p>Your answer history was: {guesses.toString()}</p>}
                <img style={{ border: 'solid' }} src={flag} alt='Country Flag' />
            </div >}

            {borderingCountriesCount && !newGameStarted && < div id='bordering-countries-failure' >
                <p>You found {correctGuesses.length} bordering countries out of {borderingCountriesCount}</p>
                {correctGuesses.length > 0 && <p>Countries found: {correctGuesses.toString()}</p>}
                <p>You missed {missingAnswersArray.toString()}</p>
                {<p>Your answer history was: {guesses.toString()}</p>}
                {<p>See {name} on the <a href={map}>map</a></p>}
            </div >}

            {!newGameStarted && <br />}

            {!newGameStarted && <PlayButton
                callback={startNewGame}
                buttonText='Try again'
            />}
            {newGameStarted && allCountriesResponse && <Country
                countriesInfo={allCountriesResponse}
            />}
        </div>
    )
}

export default FailurePage;
