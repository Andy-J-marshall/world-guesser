import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';

interface BorderingCountriesFailurePageProps {
    borderingCountries: string[];
    correctGuesses: string[];
    guesses: string[];
}

function BorderingCountriesFailurePage({
    borderingCountries,
    correctGuesses,
    guesses,
}: BorderingCountriesFailurePageProps) {
    const borderingCountriesCount = borderingCountries.length;

    useEffect(() => {
        try {
            localStorage.setItem('borderStreak', '0');
        } catch (error) {
            console.log('Unable to reset streak');
        }
    }, []);

    return (
        <div id='bordering-countries-failure-page' className='fade-in'>
            {borderingCountries && (
                <div id='bordering-countries-failure' className='game-container'>
                    <h2 className='game-over-title'>Game Over</h2>
                    <p className='error-message failure-message'>You failed. Better luck next time!</p>
                    {correctGuesses.length === 0 && (
                        <p className='failure-message'>
                            You found none of the {borderingCountriesCount} bordering countries.
                        </p>
                    )}
                    {correctGuesses.length > 0 && (
                        <p className='failure-message'>
                            You found {correctGuesses.length} of {borderingCountriesCount} bordering countries.
                        </p>
                    )}

                    <div className='answer-history-container'>
                        {correctGuesses.length > 0 && (
                            <div className='answer-section'>
                                <p>You found:</p>
                                <div className='answer-history-grid'>
                                    {correctGuesses.map((guess, index) => (
                                        <span key={index} className='answer-badge correct-badge'>
                                            {guess}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <p>Your answer history:</p>
                            <div className='answer-history-grid'>
                                {guesses.map((guess, index) => {
                                    const isCorrect = correctGuesses.includes(guess);
                                    const badgeClass = isCorrect ? 'correct-badge' : 'incorrect-badge';
                                    return (
                                        <span key={index} className={`small-text answer-badge ${badgeClass}`}>
                                            {index + 1}. {guess}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className='btn-container'>
                <StartNewGame buttonText='Try again' />
            </div>
        </div>
    );
}

export default BorderingCountriesFailurePage;
