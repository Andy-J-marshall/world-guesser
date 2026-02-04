import StartNewGame from '../../../components/layout/StartNewGame';
import BorderingCountriesStats from './BorderingCountriesStats';
import Stats from '../../../components/layout/Stats';
import { capitalizeText } from '../../../lib/utils';

interface BorderingCountriesFailurePageProps {
    name: string;
    borderingCountries: string[];
    correctGuesses: string[];
    guesses: string[];
}

function BorderingCountriesFailurePage(props: BorderingCountriesFailurePageProps) {
    // TODO refactor to use props destructuring for bordering countries too
    const borderingCountries = props.borderingCountries;
    const correctGuesses = props.correctGuesses;
    const guesses = props.guesses;

    const incorrectCount = guesses.length - correctGuesses.length;
    const borderingCountriesCount = borderingCountries.length;
    const missingAnswersArray = borderingCountries.filter(
        (countryGuess) => !correctGuesses.includes(countryGuess.toLowerCase()),
    );

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfBorderWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfBorderGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfBorderAttempts') || '0') || 0;
        const numberOfCorrectAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers') || '0') || 0;
        const numberOfIncorrectAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers') || '0') || 0;
        const stats = {
            numberOfWins: numberOfWins,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            numberOfCorrectAnswers: numberOfCorrectAnswers + correctGuesses.length,
            numberOfIncorrectAnswers: numberOfIncorrectAnswers + incorrectCount,
            streak: 0,
        };
        return stats;
    }

    return (
        <div id='bordering-countries-failure-page' className='fade-in'>
            {borderingCountries && (
                <div id='bordering-countries-failure' style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 className='game-over-title'>Game Over</h2>
                    <p className='error-message' style={{ marginBottom: 'var(--spacing-lg)' }}>
                        You failed. Better luck next time!
                    </p>
                    {correctGuesses.length === 0 && (
                        <p  style={{ marginBottom: 'var(--spacing-lg)' }}>
                            You found none of the {borderingCountriesCount} bordering countries.
                        </p>
                    )}
                    {correctGuesses.length > 0 && (
                        <p  style={{ marginBottom: 'var(--spacing-lg)' }}>
                            You found {correctGuesses.length} of {borderingCountriesCount} bordering countries.
                        </p>
                    )}

                    <div
                        style={{
                            background: 'rgba(129, 140, 248, 0.15)',
                            borderRadius: 'var(--border-radius-lg)',
                            padding: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-xl)',
                            border: '1px solid rgba(129, 140, 248, 0.3)',
                        }}
                    >
                        {correctGuesses.length > 0 && (
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <p
                                    style={{
                                        color: 'var(--color-success)',
                                        marginBottom: 'var(--spacing-xs)',
                                        fontWeight: '600',
                                    }}
                                >
                                    You found:
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>
                                    {capitalizeText(correctGuesses)}
                                </p>
                            </div>
                        )}
                        {missingAnswersArray && missingAnswersArray.length > 0 && (
                            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                <p
                                    style={{
                                        color: '#f87171',
                                        marginBottom: 'var(--spacing-xs)',
                                        fontWeight: '600',
                                    }}
                                >
                                    You missed:
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>
                                    {capitalizeText(missingAnswersArray)}
                                </p>
                            </div>
                        )}
                        <div>
                            <p
                                style={{
                                    color: 'var(--color-text-primary)',
                                    marginBottom: 'var(--spacing-xs)',
                                    fontWeight: '600',
                                }}
                            >
                                Your answer history:
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 'var(--spacing-sm)',
                                    justifyContent: 'center',
                                }}
                            >
                                {guesses.map((guess, index) => (
                                    <span
                                        key={index}
                                        className='small-text'
                                        style={{
                                            background: 'rgba(30, 41, 59, 0.8)',
                                            padding: 'var(--spacing-xs) var(--spacing-md)',
                                            borderRadius: 'var(--border-radius-md)',
                                            color: 'var(--color-text-secondary)',
                                            border: '1px solid rgba(129, 140, 248, 0.2)',
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        {index + 1}. {guess}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <BorderingCountriesStats updateStatsCallback={updateStats} />
            <div className='btn-container'>
                <StartNewGame buttonText='Try again' />
                <Stats />
            </div>
        </div>
    );
}

export default BorderingCountriesFailurePage;
