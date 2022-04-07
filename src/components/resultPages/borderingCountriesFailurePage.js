import React, { useState } from 'react';
import StartNewGame from '../startNewGame';
import { capitalizeText } from '../../helpers/utils';

function BorderingCountriesFailurePage(props) {
    const name = props.name;
    const map = props.map;
    const borderingCountries = props.borderingCountries;
    const correctGuesses = props.correctGuesses;
    const guesses = props.guesses;

    const borderingCountriesCount = borderingCountries.length;
    const missingAnswersArray = borderingCountries.filter(countryGuess => !correctGuesses.includes(countryGuess.toLowerCase()));

    const [newGameStarted, setNewGameStarted] = useState(false);

    return (
        <div id='failure-page'>
            {borderingCountries && !newGameStarted && < div id='bordering-countries-failure' >
                <p style={{ color: 'red' }}>You failed. Better luck next time</p>
                <p>See {name} on the <a href={map}>map</a></p>
                {correctGuesses.length === 0 && <p>You found none of the bordering countries and missed {borderingCountriesCount}</p>}
                {correctGuesses.length > 0 && <p>You found {correctGuesses.length} of {borderingCountriesCount}</p>}
                {correctGuesses.length > 0 && <p>You found: {capitalizeText(correctGuesses)}</p>}
                {missingAnswersArray && <p>You missed: {capitalizeText(missingAnswersArray)}</p>}
                {<p>Your answer history was: {capitalizeText(guesses)}</p>}
            </div >}

            <StartNewGame
                buttonText='Try again'
                callback={setNewGameStarted}
            />
        </div>
    )
}

export default BorderingCountriesFailurePage;
