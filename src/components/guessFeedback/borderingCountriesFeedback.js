import React from 'react';
import { capitalizeText } from '../../helpers/utils';

function borderingCountriesFeedback(props) {
    const correctGuesses = props.correctGuesses;
    const incorrectGuesses = props.incorrectGuesses;
    const borderingCountriesCount = props.borderingCountriesCount;
    const incorrectCount = props.incorrectCount;

    const guessesRemainingCount = 6 - incorrectCount;
    const guessesRemainingText = incorrectCount >= 5
        ? `You have ${guessesRemainingCount} life remaining`
        : `You have ${guessesRemainingCount} lives remaining`;

    const countriesRemainingCount = borderingCountriesCount - correctGuesses.length;
    const countriesRemainingText = correctGuesses.length === borderingCountriesCount - 1
        ? `There is ${countriesRemainingCount} bordering country remaining`
        : `There are ${countriesRemainingCount} bordering countries remaining`;

    return (
        <div id='bordering-countries-guess-feedback'>
            {correctGuesses.length > 0 && <p style={{ color: 'green' }}>Correct answers so far: {capitalizeText(correctGuesses)}</p>}
            {incorrectGuesses.length > 0 && <p style={{ color: 'red' }}>Incorrect answers so far: {capitalizeText(incorrectGuesses)}</p>}
            <br />
            <p>{guessesRemainingText}</p>
            <p>{countriesRemainingText}</p>
            <br />
        </div>
    )
}

export default borderingCountriesFeedback;
