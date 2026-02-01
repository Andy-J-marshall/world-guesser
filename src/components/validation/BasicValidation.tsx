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
    <div style={{ color: "#F66B0E" }} id="invalid-guess-feedback">
      {duplicateGuess && <p>You've already tried that country!</p>}
      {!knownCountry && <p>Enter a valid country name</p>}
    </div>
  );
}

export default BasicValidation;
