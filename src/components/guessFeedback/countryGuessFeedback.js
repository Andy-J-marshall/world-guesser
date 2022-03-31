import React from 'react';
import { capitalizeText}  from '../../helpers/utils';

function duplicateGuess(props) {
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const duplicateGuess = props.duplicateGuess;

    return (
        <div id='country-guess-feedback'>
            {!duplicateGuess && <p style={{ color: 'red' }}>Incorrect! That was attempt number {incorrectCount}/6.</p>}
            {<p>Your answers so far: {capitalizeText(guesses)}</p>}
        </div>
    )
}

export default duplicateGuess;
