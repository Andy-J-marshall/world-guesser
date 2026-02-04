import { useState, useEffect } from 'react';

interface BorderStats {
    numberOfWins: number;
    numberOfGames: number;
    numberOfAttempts: number;
    numberOfCorrectAnswers: number;
    numberOfIncorrectAnswers: number;
    streak: number;
}

interface BorderingCountriesStatsProps {
    updateStatsCallback: () => BorderStats;
}

function BorderingCountriesStats({ updateStatsCallback }: BorderingCountriesStatsProps) {
    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const {
            numberOfWins,
            numberOfGames,
            numberOfAttempts,
            numberOfCorrectAnswers,
            numberOfIncorrectAnswers,
            streak,
        } = updateStatsCallback();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        setStreak(streak);

        try {
            localStorage.setItem('numberOfBorderWins', JSON.stringify(numberOfWins));
            localStorage.setItem('numberOfBorderGames', JSON.stringify(numberOfGames));
            localStorage.setItem('numberOfBorderAttempts', JSON.stringify(numberOfAttempts));
            localStorage.setItem('numberOfCorrectBorderAnswers', JSON.stringify(numberOfCorrectAnswers));
            localStorage.setItem('numberOfIncorrectBorderAnswers', JSON.stringify(numberOfIncorrectAnswers));
            localStorage.setItem('borderStreak', JSON.stringify(streak));
        } catch (error) {
            console.log('Unable to update stats');
        }
    }, [updateStatsCallback]);

    return (
        <div id='country-guesser-stats' style={{ maxWidth: '700px', margin: '0 auto', marginTop: 'var(--spacing-xl)' }}>
            {numberOfGames > 0 && numberOfAttempts > 0 && (
                <div
                    style={{
                        background: 'rgba(30, 41, 59, 0.6)',
                        borderRadius: 'var(--border-radius-lg)',
                        padding: 'var(--spacing-xl)',
                        border: '1px solid rgba(129, 140, 248, 0.3)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <h2
                        style={{
                            marginBottom: 'var(--spacing-lg)',
                            color: 'var(--color-primary-light)',
                            textAlign: 'center',
                        }}
                    >
                        Stats
                    </h2>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 'var(--spacing-md)',
                            marginBottom: numberOfWins > 0 && streak > 0 ? 'var(--spacing-lg)' : '0',
                        }}
                    >
                        <div
                            style={{
                                background: 'rgba(129, 140, 248, 0.1)',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid rgba(129, 140, 248, 0.2)',
                                textAlign: 'center',
                            }}
                        >
                            <p
                                className='large-stat'
                                style={{
                                    fontWeight: '700',
                                    color: 'var(--color-primary-light)',
                                    margin: '0 0 var(--spacing-xs) 0',
                                }}
                            >
                                {numberOfGames}
                            </p>
                            <p
                                className='small-text'
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    margin: 0,
                                }}
                            >
                                Games
                            </p>
                        </div>

                        <div
                            style={{
                                background: 'rgba(52, 211, 153, 0.1)',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid rgba(52, 211, 153, 0.2)',
                                textAlign: 'center',
                            }}
                        >
                            <p
                                className='large-stat'
                                style={{
                                    fontWeight: '700',
                                    color: 'var(--color-success)',
                                    margin: '0 0 var(--spacing-xs) 0',
                                }}
                            >
                                {numberOfWins}
                            </p>
                            <p
                                className='small-text'
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    margin: 0,
                                }}
                            >
                                Wins
                            </p>
                        </div>
                    </div>

                    {numberOfWins > 0 && streak > 0 && (
                        <div
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(129, 140, 248, 0.15))',
                                padding: 'var(--spacing-md)',
                                borderRadius: 'var(--border-radius-md)',
                                border: '1px solid rgba(192, 132, 252, 0.3)',
                                textAlign: 'center',
                            }}
                        >
                            <p
                                style={{
                                    color: 'var(--color-text-primary)',
                                    fontWeight: '600',
                                    margin: 0,
                                }}
                            >
                                You are on a{' '}
                                <span style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>{streak}</span>{' '}
                                game winning streak!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default BorderingCountriesStats;
