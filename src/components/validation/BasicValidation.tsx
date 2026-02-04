interface ValidationErrorsProps {
    duplicateGuess?: boolean;
    knownCountry?: boolean;
    children?: React.ReactNode;
}

function ValidationErrors({ duplicateGuess, knownCountry, children }: ValidationErrorsProps) {
    if (!duplicateGuess && knownCountry && !children) {
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
            {children}
        </div>
    );
}

export default ValidationErrors;
