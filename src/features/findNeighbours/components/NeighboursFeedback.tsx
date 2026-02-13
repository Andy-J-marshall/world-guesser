import { MAX_ATTEMPTS_FIND_NEIGHBOURS } from '../../../constants/game';

interface NeighboursFeedbackProps {
    correctGuesses: string[];
    incorrectCount: number;
}

function NeighboursFeedback({ correctGuesses, incorrectCount }: NeighboursFeedbackProps) {
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

export default NeighboursFeedback;
