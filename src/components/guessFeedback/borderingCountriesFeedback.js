import React from 'react';

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
            {/* TODO make a bigger deal about correct and incorrect guesses e.g. colours etc. */}
            {correctGuesses.length > 0 && <p>Correct guesses so far: {correctGuesses.toString()}</p>}
            {incorrectGuesses.length > 0 && <p>Incorrect guesses so far: {incorrectGuesses.toString()}</p>}
            <br />
            <p>{guessesRemainingText}</p>
            <p>{countriesRemainingText}</p>
        </div>
    )
}

export default borderingCountriesFeedback;
