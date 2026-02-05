import { capitalizeText } from '../../../lib/utils';
import { MAX_ATTEMPTS_BORDERING_COUNTRIES } from '../../../constants';

interface BorderingCountriesFeedbackProps {
    correctGuesses: string[];
    incorrectGuesses: string[];
    borderingCountriesCount: number;
    incorrectCount: number;
}

function BorderingCountriesFeedback({ correctGuesses, incorrectGuesses, borderingCountriesCount, incorrectCount }: BorderingCountriesFeedbackProps) {
    const guessesRemainingCount = MAX_ATTEMPTS_BORDERING_COUNTRIES - incorrectCount;
    const guessesRemainingText =
        incorrectCount >= MAX_ATTEMPTS_BORDERING_COUNTRIES - 1
            ? `You have ${guessesRemainingCount} life remaining`
            : `You have ${guessesRemainingCount} lives remaining`;

    const countriesRemainingCount = borderingCountriesCount - correctGuesses.length;
    const countriesRemainingText =
        correctGuesses.length === borderingCountriesCount - 1
            ? `There is ${countriesRemainingCount} bordering country remaining`
            : `There are ${countriesRemainingCount} bordering countries remaining`;

    return (
        <div id='bordering-countries-guess-feedback'>
            {correctGuesses.length > 0 && (
                <p className='feedback-correct'>Correct answers so far: {capitalizeText(correctGuesses)}</p>
            )}
            {incorrectGuesses.length > 0 && (
                <p className='feedback-incorrect'>Incorrect answers so far: {capitalizeText(incorrectGuesses)}</p>
            )}
            <p>{guessesRemainingText}</p>
            <p>{countriesRemainingText}</p>
        </div>
    );
}

export default BorderingCountriesFeedback;
