import React from 'react';

function basicValidation(props) {
    const duplicateGuess = props.duplicateGuess;
    const knownCountry = props.knownCountry;

    return (
        <div style={{ color: 'brown' }} id='invalid-guess-feedback'>
            {duplicateGuess && <p>You've already tried that country!</p>}
            {!knownCountry && <p>Enter a valid country name</p>}
        </div>
    )
}

export default basicValidation;
