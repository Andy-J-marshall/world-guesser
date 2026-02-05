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
        <div id='country-guess-feedback' className='feedback-margin-top'>
            {!duplicateGuess && (
                <p className='feedback-incorrect'>Incorrect! That was attempt number {incorrectCount}/6.</p>
            )}
            {guessedBorderingCountry && <p>You're getting close!</p>}
            {<p>Your guesses so far: {capitalizeText(guesses)}</p>}
        </div>
    );
}

export default CountryGuessFeedback;
