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
            className='small-text'
            style={{
                color: '#F66B0E',
                padding: 'var(--spacing-xs) var(--spacing-sm)',
                marginTop: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-md)',
                textAlign: 'center',
            }}
            id='invalid-guess-feedback'
        >
            {duplicateGuess && <p style={{ margin: 0 }}>You've already tried that country!</p>}
            {!knownCountry && <p style={{ margin: 0 }}>Enter a valid country name</p>}
            {actualCountry && <p style={{ margin: 0 }}>That's the actual country! Guess the bordering ones instead</p>}
        </div>
    );
}

export default ValidationErrors;
