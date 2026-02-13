import { MAX_ATTEMPTS_FIND_NEIGHBOURS } from '../../../constants/game';

interface NeighboursFeedbackProps {
    guesses: string[];
    correctGuesses: string[];
    incorrectCount: number;
}

function NeighboursFeedback({ guesses, correctGuesses, incorrectCount }: NeighboursFeedbackProps) {
    const guessesRemainingCount = MAX_ATTEMPTS_FIND_NEIGHBOURS - incorrectCount;
    const livesWord = guessesRemainingCount === 1 ? 'life' : 'lives';

    return (
        <div id='neighbours-guess-feedback'>
            {incorrectCount > 0 && incorrectCount < MAX_ATTEMPTS_FIND_NEIGHBOURS && (
                <div>
                    <div className='lives-counter'>
                        {guessesRemainingCount} {livesWord} remaining
                    </div>
                </div>
            )}
            <div className='feedback-section'>
                <div className='feedback-badges'>
                    {guesses.map((guess, index) => {
                        const isCorrect = correctGuesses.includes(guess);
                        const badgeClass = isCorrect ? 'answer-badge correct-badge' : 'answer-badge incorrect-badge';

                        return (
                            <span key={index} className={badgeClass}>
                                {guess}
                            </span>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default NeighboursFeedback;
