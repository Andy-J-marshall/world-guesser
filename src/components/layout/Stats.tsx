import { useState } from 'react';
import Button from '../ui/Button';
import { getFromLocalStorage } from '../../lib/utils';

function Stats() {
    const [showStats, setShowStats] = useState(false);
    const [buttonText, setButtonText] = useState('Show Stats');

    const numberOfCountryGuesserGames = getFromLocalStorage<number>('numberOfGames', 0);
    const numberOfCountryGuesserWins = getFromLocalStorage<number>('numberOfWins', 0);
    const numberOfCountryGuesserAttempts = getFromLocalStorage<number>('numberOfAttempts', 0);
    const countryGuesserStreak = getFromLocalStorage<number>('streak', 0);

    const numberOfBorderGames = getFromLocalStorage<number>('numberOfBorderGames', 0);
    const numberOfBorderWins = getFromLocalStorage<number>('numberOfBorderWins', 0);
    const numberOfCorrectBorderAnswers = getFromLocalStorage<number>('numberOfCorrectBorderAnswers', 0);
    const numberOfIncorrectBorderAnswers = getFromLocalStorage<number>('numberOfIncorrectBorderAnswers', 0);
    const borderStreak = getFromLocalStorage<number>('borderStreak', 0);

    function showStatsCallback() {
        if (showStats) {
            setShowStats(false);
            setButtonText('Show Stats');
        } else {
            setShowStats(true);
            setButtonText('Hide Stats');
        }
    }

    return (
        <>
            {(numberOfCountryGuesserGames > 0 || numberOfBorderGames > 0) && (
                <Button callback={showStatsCallback} buttonText={buttonText} />
            )}
            {showStats && (numberOfCountryGuesserGames > 0 || numberOfBorderGames > 0) && (
                <div
                    className='stats-panel fade-in'
                    style={{ maxWidth: '900px', margin: '0 auto', marginTop: 'var(--spacing-xs)' }}
                >
                    {numberOfCountryGuesserGames > 0 && (
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
                                className='large-stat'
                                style={{
                                    marginBottom: 'var(--spacing-lg)',
                                    color: 'var(--color-primary-light)',
                                    textAlign: 'center',
                                }}
                            >
                                Country Guesser Stats
                            </h2>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 'var(--spacing-md)',
                                    marginTop: 'var(--spacing-lg)',
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
                                            color: 'var(--color-primary-light)',
                                            margin: '0 0 var(--spacing-xs) 0',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {numberOfCountryGuesserGames}
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
                                            color: 'var(--color-success)',
                                            margin: '0 0 var(--spacing-xs) 0',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {numberOfCountryGuesserWins}
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
                                {numberOfCountryGuesserWins > 0 && (
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
                                                color: 'var(--color-primary-light)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {((numberOfCountryGuesserWins / numberOfCountryGuesserGames) * 100).toFixed(
                                                1,
                                            )}
                                            %
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Win percentage
                                        </p>
                                    </div>
                                )}
                                {numberOfCountryGuesserWins > 0 && (
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
                                                color: 'var(--color-primary-light)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {(numberOfCountryGuesserAttempts / numberOfCountryGuesserWins).toFixed(1)}
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Avg. guesses per win
                                        </p>
                                    </div>
                                )}
                                {numberOfCountryGuesserWins > 0 && (
                                    <div
                                        style={{
                                            background: 'rgba(251, 191, 36, 0.1)',
                                            padding: 'var(--spacing-md)',
                                            borderRadius: 'var(--border-radius-md)',
                                            border: '1px solid rgba(251, 191, 36, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p
                                            className='large-stat'
                                            style={{
                                                color: 'var(--color-warning)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {countryGuesserStreak}
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Streak
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {numberOfBorderGames > 0 && (
                        <div
                            style={{
                                marginTop: 'var(--spacing-xl)',
                                background: 'rgba(30, 41, 59, 0.6)',
                                borderRadius: 'var(--border-radius-lg)',
                                padding: 'var(--spacing-xl)',
                                border: '1px solid rgba(129, 140, 248, 0.3)',
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            <h2
                                className='large-stat'
                                style={{
                                    marginBottom: 'var(--spacing-lg)',
                                    color: 'var(--color-primary-light)',
                                    textAlign: 'center',
                                }}
                            >
                                Bordering Countries Guesser Stats
                            </h2>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                    gap: 'var(--spacing-md)',
                                    marginTop: 'var(--spacing-lg)',
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
                                            color: 'var(--color-primary-light)',
                                            margin: '0 0 var(--spacing-xs) 0',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {numberOfBorderGames}
                                    </p>
                                    <p
                                        className='small-text'
                                        style={{
                                            color: 'var(--color-text-secondary)',
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
                                        className='large-stat'
                                        style={{
                                            color: 'var(--color-success)',
                                            margin: '0 0 var(--spacing-xs) 0',
                                            fontWeight: '700',
                                        }}
                                    >
                                        {numberOfBorderWins}
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
                                {numberOfBorderWins > 0 && (
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
                                                color: 'var(--color-primary-light)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {((numberOfBorderWins / numberOfBorderGames) * 100).toFixed(1)}%
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Win percentage
                                        </p>
                                    </div>
                                )}
                                {numberOfCorrectBorderAnswers > 0 && (
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
                                                color: 'var(--color-success)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {(numberOfCorrectBorderAnswers / numberOfBorderGames).toFixed(1)}
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Avg. correct per game
                                        </p>
                                    </div>
                                )}
                                {numberOfIncorrectBorderAnswers > 0 && (
                                    <div
                                        style={{
                                            background: 'rgba(248, 113, 113, 0.1)',
                                            padding: 'var(--spacing-md)',
                                            borderRadius: 'var(--border-radius-md)',
                                            border: '1px solid rgba(248, 113, 113, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p
                                            className='large-stat'
                                            style={{
                                                color: 'var(--color-error)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {(numberOfIncorrectBorderAnswers / numberOfBorderGames).toFixed(1)}
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Avg. incorrect per game
                                        </p>
                                    </div>
                                )}
                                {numberOfBorderWins > 0 && (
                                    <div
                                        style={{
                                            background: 'rgba(251, 191, 36, 0.1)',
                                            padding: 'var(--spacing-md)',
                                            borderRadius: 'var(--border-radius-md)',
                                            border: '1px solid rgba(251, 191, 36, 0.2)',
                                            textAlign: 'center',
                                        }}
                                    >
                                        <p
                                            className='large-stat'
                                            style={{
                                                color: 'var(--color-warning)',
                                                margin: '0 0 var(--spacing-xs) 0',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {borderStreak}
                                        </p>
                                        <p
                                            className='small-text'
                                            style={{
                                                color: 'var(--color-text-secondary)',
                                                margin: 0,
                                            }}
                                        >
                                            Streak
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Stats;
