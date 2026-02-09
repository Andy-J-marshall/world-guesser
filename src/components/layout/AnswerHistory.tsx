interface AnswerHistoryProps {
    guesses: string[];
    correctGuesses?: string[];
    title?: string;
}

function AnswerHistory({ guesses, correctGuesses, title = 'Your guesses:' }: AnswerHistoryProps) {
    const hasColorCoding = correctGuesses !== undefined;

    return (
        <div className='answer-history-container'>
            <p className='answer-history-title'>{title}</p>
            <div className='answer-history-grid'>
                {guesses.map((guess, index) => {
                    let badgeClass = 'answer-badge';
                    
                    if (hasColorCoding && correctGuesses) {
                        const isCorrect = correctGuesses.includes(guess);
                        badgeClass += isCorrect ? ' correct-badge' : ' incorrect-badge';
                    }
                    
                    return (
                        <span key={index} className={badgeClass}>
                            {guess}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

export default AnswerHistory;
