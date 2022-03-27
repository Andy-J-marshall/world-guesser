import React from 'react';

function borderingCountriesFeedback(props) {
    const correctGuesses = props.correctGuesses;
    const incorrectGuesses = props.incorrectGuesses;
    const borderingCountriesCount = props.borderingCountriesCount;
    const incorrectCount = props.incorrectCount;

    return (
        <div id='bordering-countries-guess-feedback'>
            {/* TODO make a bigger deal about correct and incorrect guesses e.g. colours etc. */}
            {correctGuesses.length > 0 && <p>Correct guesses so far: {correctGuesses.toString()}</p>}
            {incorrectGuesses.length > 0 && <p>Incorrect guesses so far: {incorrectGuesses.toString()}</p>}
            <br/>
            <p>You have {6 - incorrectCount} lives remaining</p>
            <p>There are {borderingCountriesCount - correctGuesses.length} bordering countries remaining</p>
        </div>
    )
}

export default borderingCountriesFeedback;
