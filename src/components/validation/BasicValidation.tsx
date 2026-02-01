interface BasicValidationProps {
  duplicateGuess: boolean;
  knownCountry: boolean;
}

function BasicValidation(props: BasicValidationProps) {
  const duplicateGuess = props.duplicateGuess;
  const knownCountry = props.knownCountry;

  if (!duplicateGuess && knownCountry) {
    return null;
  }

  return (
    <div style={{ 
      color: "#F66B0E",
      fontSize: '0.9rem',
      padding: 'var(--spacing-xs) var(--spacing-sm)',
      marginTop: 'var(--spacing-sm)',
      marginBottom: 'var(--spacing-md)',
      textAlign: 'center'
    }} id="invalid-guess-feedback">
      {duplicateGuess && <p style={{ margin: 0 }}>You've already tried that country!</p>}
      {!knownCountry && <p style={{ margin: 0 }}>Enter a valid country name</p>}
    </div>
  );
}

export default BasicValidation;
