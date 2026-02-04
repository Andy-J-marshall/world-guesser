import StartNewGame from '../../../components/layout/StartNewGame';
import BorderingCountriesStats from './BorderingCountriesStats';
import Stats from '../../../components/layout/Stats';

interface BorderingCountriesSuccessPageProps {
    incorrectGuesses: string[];
    correctGuesses: string[];
    name: string;
    guesses: string[];
}

function BorderingCountriesSuccessPage(props: BorderingCountriesSuccessPageProps) {
    const incorrectGuesses = props.incorrectGuesses;
    const correctGuesses = props.correctGuesses;
    const name = props.name;
    const guesses = props.guesses;
    const incorrectCount = incorrectGuesses.length;
    const answerOrAnswers = incorrectCount === 1 ? 'answer' : 'answers';

    const messageText =
        correctGuesses.length === 1
            ? `Well done! You found the only bordering country of ${name} with ${incorrectCount} incorrect ${answerOrAnswers}`
            : `Well done! You found the ${correctGuesses.length} bordering countries of ${name} with ${incorrectCount} incorrect answers`;

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfBorderWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfBorderGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfBorderAttempts') || '0') || 0;
        const numberOfCorrectAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers') || '0') || 0;
        const numberOfIncorrectAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers') || '0') || 0;
        const streak = JSON.parse(localStorage.getItem('borderStreak') || '0') || 0;
        const stats = {
            numberOfWins: numberOfWins + 1,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            numberOfCorrectAnswers: numberOfCorrectAnswers + correctGuesses.length,
            numberOfIncorrectAnswers: numberOfIncorrectAnswers + incorrectCount,
            streak: streak + 1,
        };
        return stats;
    }

    return (
        <div className='fade-in'>
            <div id='successful-bordering-countries-game' style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h2 className='success-title'>🎉 Success!</h2>
                <h3
                    style={{
                        color: 'var(--color-success)',
                        marginBottom: 'var(--spacing-xl)',
                    }}
                >
                    {messageText}
                </h3>
                <div
                    style={{
                        background: 'rgba(129, 140, 248, 0.15)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-lg)',
                        marginBottom: 'var(--spacing-xl)',
                        border: '1px solid rgba(129, 140, 248, 0.3)',
                    }}
                >
                    <p
                        style={{
                            color: 'var(--color-text-primary)',
                            marginBottom: 'var(--spacing-sm)',
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
            <BorderingCountriesStats updateStatsCallback={updateStats} />
            <div className='btn-container'>
                <StartNewGame buttonText='Play again' />
                <Stats />
            </div>
        </div>
    );
}

export default BorderingCountriesSuccessPage;
