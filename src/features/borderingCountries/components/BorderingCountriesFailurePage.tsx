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
                <div id='bordering-countries-failure' className='game-container success-page-container'>
                    <div className='success-stat-hero'>
                        <div className='success-celebration'>Not quite!</div>
                        {correctGuesses.length === 0 && (
                            <p className='failure-message'>No borders found. Keep trying!</p>
                        )}
                        {correctGuesses.length > 0 && (
                            <p className='failure-message'>
                                {correctGuesses.length} of {borderingCountriesCount} borders found.
                            </p>
                        )}
                    </div>
                    <div className='btn-container'>
                        <StartNewGame buttonText='Try again' />
                    </div>
                    <div className='answer-history-container'>
                        <div>
                            <p className='answer-history-title'>Your guesses:</p>
                            <div className='answer-history-grid'>
                                {guesses.map((guess, index) => {
                                    const isCorrect = correctGuesses.includes(guess);
                                    const badgeClass = isCorrect ? 'correct-badge' : 'incorrect-badge';
                                    return (
                                        <span key={index} className={`answer-badge ${badgeClass}`}>
                                            {guess}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BorderingCountriesFailurePage;
