import React, { useState } from 'react';
import Country from '../country';
import PlayButton from '../playButton';
import getAllCountriesRequest from '../../helpers/allCountriesRequest';
import { capitalizeText } from '../../helpers/utils';

function FailurePage(props) {
    const name = props.name;
    const flag = props.flag;
    const map = props.map;
    const borderingCountries = props.borderingCountries;
    const correctGuesses = props.correctGuesses;
    const guesses = props.guesses;

    let borderingCountriesCount;
    let missingAnswersArray;
    if (borderingCountries) {
        borderingCountriesCount = borderingCountries.length;
        missingAnswersArray = borderingCountries.filter(countryGuess => !correctGuesses.includes(countryGuess.toLowerCase()));
    }

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [allCountriesResponse, setAllCountriesResponse] = useState();

    async function startNewGame() {
        setNewGameStarted(true);
        const response = await getAllCountriesRequest();
        setAllCountriesResponse(response);
    }

    return (
        <div id='failure-page'>
            {!newGameStarted && <p style={{ color: 'red' }}>You failed. Better luck next time</p>}
            {!borderingCountries && !newGameStarted && < div id='country-failure' >
                {<p>The answer was <a href={map}>{name}</a></p>}
                {<p>Your answer history was: {capitalizeText(guesses)}</p>}
                <img style={{ border: 'solid' }} src={flag} alt='Country Flag' />
            </div >}

            {borderingCountries && !newGameStarted && < div id='bordering-countries-failure' >
                {!correctGuesses && <p>You found none of the {borderingCountriesCount} bordering countries</p>}
                {correctGuesses && correctGuesses.length > 0 && <p>You found {correctGuesses.length} bordering countries out of {borderingCountriesCount}</p>}
                {correctGuesses && correctGuesses.length > 0 && <p>You found: {capitalizeText(correctGuesses)}</p>}
                {missingAnswersArray && <p>You missed: {capitalizeText(missingAnswersArray)}</p>}
                {<p>Your answer history was: {capitalizeText(guesses)}</p>}
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
