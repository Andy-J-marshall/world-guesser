interface ValidationErrorsProps {
    duplicateGuess?: boolean;
    knownCountry?: boolean;
    actualCountry?: boolean;
}

function ValidationErrors({ duplicateGuess, knownCountry, actualCountry }: ValidationErrorsProps) {
    if (!duplicateGuess && knownCountry && !actualCountry) {
        return null;
    }

    return (
        <div
            className='small-text validation-error-text'
            id='invalid-guess-feedback'
        >
            {duplicateGuess && <p className='validation-error-message'>You've already tried that country!</p>}
            {!knownCountry && <p className='validation-error-message'>Enter a valid country name</p>}
            {actualCountry && <p className='validation-error-message'>That's the actual country! Guess the bordering ones instead</p>}
        </div>
    );
}

export default ValidationErrors;
