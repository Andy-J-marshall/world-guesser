import { MAX_ATTEMPTS_BORDERING_COUNTRIES } from '../../../constants';

interface BorderingCountriesFeedbackProps {
    correctGuesses: string[];
    incorrectGuesses: string[];
    borderingCountriesCount: number;
    incorrectCount: number;
}

function BorderingCountriesFeedback({
    correctGuesses,
    incorrectGuesses,
    borderingCountriesCount,
    incorrectCount,
}: BorderingCountriesFeedbackProps) {
    const guessesRemainingCount = MAX_ATTEMPTS_BORDERING_COUNTRIES - incorrectCount;
    const livesWord = incorrectCount >= MAX_ATTEMPTS_BORDERING_COUNTRIES - 1 ? 'life' : 'lives';

    const countriesRemainingCount = borderingCountriesCount - correctGuesses.length;
    const countryWord = correctGuesses.length === borderingCountriesCount - 1 ? 'is' : 'are';
    const countryPluralWord =
        correctGuesses.length === borderingCountriesCount - 1 ? 'country' : 'countries';

    return (
        <div id='bordering-countries-guess-feedback'>
            <div className='game-status-container'>
                <div className='game-status-item'>
                    <span className='game-status-text'>
                        You have <strong>{guessesRemainingCount}</strong> {livesWord} remaining
                    </span>
                </div>
                <div className='game-status-item'>
                    <span className='game-status-text'>
                        There {countryWord} <strong>{countriesRemainingCount}</strong> bordering{' '}
                        {countryPluralWord} remaining
                    </span>
                </div>
            </div>
            {correctGuesses.length > 0 && (
                <div className='feedback-section feedback-section-separator'>
                    <p className='feedback-correct feedback-title'>Correct answers so far:</p>
                    <div className='feedback-badges'>
                        {correctGuesses.map((guess, index) => (
                            <span key={index} className='answer-badge correct-badge'>
                                {guess}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            {incorrectGuesses.length > 0 && (
                <div className='feedback-section feedback-section-separator'>
                    <p className='feedback-incorrect feedback-title'>Incorrect answers so far:</p>
                    <div className='feedback-badges'>
                        {incorrectGuesses.map((guess, index) => (
                            <span key={index} className='answer-badge incorrect-badge'>
                                {guess}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default BorderingCountriesFeedback;
