import { useState, useEffect } from 'react';

interface StatsResult {
    numberOfWins: number;
    numberOfGames: number;
    numberOfAttempts: number;
    streak: number;
}

interface CountryGuesserStatsProps {
    updateStatsCallback: () => StatsResult;
}

function CountryGuesserStats(props: CountryGuesserStatsProps) {
    const updateStats = props.updateStatsCallback;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [streak, setStreak] = useState(0);

    const called = true;

    useEffect(() => {
        const { numberOfWins, numberOfGames, numberOfAttempts, streak } = updateStats();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        setStreak(streak);

        try {
            localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins));
            localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames));
            localStorage.setItem('numberOfAttempts', JSON.stringify(numberOfAttempts));
            localStorage.setItem('streak', JSON.stringify(streak));
        } catch (error) {
            console.log('Unable to update stats');
        }
    }, [called]);

    return (
        <div id='country-guesser-stats' style={{ maxWidth: '700px', margin: '0 auto', marginTop: 'var(--spacing-xl)' }}>
            {numberOfAttempts > 0 && numberOfGames > 0 && (
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
                            fontSize: '2rem',
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
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: 'var(--color-primary-light)',
                                    margin: '0 0 var(--spacing-xs) 0',
                                }}
                            >
                                {numberOfGames}
                            </p>
                            <p
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                }}
                            >
                                Total games
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
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: 'var(--color-success)',
                                    margin: '0 0 var(--spacing-xs) 0',
                                }}
                            >
                                {numberOfWins}
                            </p>
                            <p
                                style={{
                                    color: 'var(--color-text-secondary)',
                                    fontSize: '0.9rem',
                                    margin: 0,
                                }}
                            >
                                Number of wins
                            </p>
                        </div>
                    </div>

                    {numberOfWins > 0 && streak > 0 && (
                        <div
                            style={{
                                background: 'linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(129, 140, 248, 0.15))',
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
                                    fontSize: '1.05rem',
                                    margin: 0,
                                }}
                            >
                                You are on a <span style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>{streak}</span>{' '}
                                game winning streak!
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CountryGuesserStats;
