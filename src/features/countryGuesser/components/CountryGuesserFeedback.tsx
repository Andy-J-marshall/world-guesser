import { capitalizeText } from '../../../lib/utils';

interface CountryGuessFeedbackProps {
    incorrectCount: number;
    guesses: string[];
    duplicateGuess: boolean;
    guessedBorderingCountry: boolean;
}

function CountryGuessFeedback(props: CountryGuessFeedbackProps) {
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const duplicateGuess = props.duplicateGuess;
    const guessedBorderingCountry = props.guessedBorderingCountry;

    return (
        <div id='country-guess-feedback'>
            {!duplicateGuess && <p style={{ color: '#F66B0E' }}>Incorrect! That was attempt number {incorrectCount}/6.</p>}
            {guessedBorderingCountry && <p>You're getting close!</p>}
            {<p>Your answers so far: {capitalizeText(guesses)}</p>}
        </div>
    )
}

export default CountryGuessFeedback;
