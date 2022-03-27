import React from 'react';

function duplicateGuess(props) {
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const duplicateGuess = props.duplicateGuess;

    return (
        <div id='country-guess-feedback'>
            {!duplicateGuess && <p style={{ color: 'red' }}>Incorrect! That was attempt number {incorrectCount}/6.</p>}
            {<p>Your guesses so far: {guesses.toString()}</p>}
        </div>
    )
}

export default duplicateGuess;
