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
    const livesWord = guessesRemainingCount === 1 ? 'life' : 'lives';

    return (
        <div id='bordering-countries-guess-feedback'>
            {incorrectCount > 0 && incorrectCount < MAX_ATTEMPTS_BORDERING_COUNTRIES && (
                <div style={{ textAlign: 'left' }}>
                    <div className='lives-counter'>
                        {guessesRemainingCount} {livesWord} remaining
                    </div>
                </div>
            )}
            {correctGuesses.length > 0 && (
                <div className='feedback-section'>
                    <div className='feedback-badges'>
                        {correctGuesses.map((guess, index) => (
                            <span key={index} className='answer-badge correct-badge'>
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
