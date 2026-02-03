import { useState } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import CountryGuesserStats from './CountryGuesserStats';
import Stats from '../../../components/layout/Stats';

interface CountryGuesserFailurePageProps {
    name: string;
    flag: string;
    map: string;
    guesses: string[];
}

function CountryGuesserFailurePage(props: CountryGuesserFailurePageProps) {
    const name = props.name;
    const flag = props.flag;
    const map = props.map;
    const guesses = props.guesses;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || '0') || 0;
        const stats = {
            numberOfWins,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            streak: 0,
        };
        return stats;
    }

    return (
        <div id='country-guesser-failure-page' className='fade-in'>
            {!newGameStarted && (
                <div id='country-failure' style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-lg)' }}>Game Over</h2>
                    <p style={{ color: '#f87171', fontSize: '1.3rem', marginBottom: 'var(--spacing-lg)' }}>
                        You failed. Better luck next time!
                    </p>
                    <p style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-lg)' }}>
                        The answer was{' '}
                        <a
                            href={map}
                            target='_blank'
                            rel='noopener noreferrer'
                            style={{ color: 'var(--color-primary-light)', textDecoration: 'underline' }}
                        >
                            {name}
                        </a>
                    </p>

                    <div
                        style={{
                            background: 'rgba(129, 140, 248, 0.15)',
                            borderRadius: 'var(--border-radius-lg)',
                            padding: 'var(--spacing-lg)',
                            marginBottom: 'var(--spacing-xl)',
                            border: '1px solid rgba(129, 140, 248, 0.3)',
                        }}
                    >
                        <p style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                            Your answer history:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)', justifyContent: 'center' }}>
                            {guesses.map((guess, index) => (
                                <span
                                    key={index}
                                    style={{
                                        background: 'rgba(30, 41, 59, 0.8)',
                                        padding: 'var(--spacing-xs) var(--spacing-md)',
                                        borderRadius: 'var(--border-radius-md)',
                                        color: 'var(--color-text-secondary)',
                                        border: '1px solid rgba(129, 140, 248, 0.2)',
                                        fontSize: '0.95rem',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {index + 1}. {guess}
                                </span>
                            ))}
                        </div>
                    </div>

                    <img
                        src={flag}
                        alt='Country Flag'
                        style={{
                            maxWidth: '300px',
                            marginTop: 'var(--spacing-lg)',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: 'var(--border-radius-lg)',
                        }}
                    />
                </div>
            )}
            {!newGameStarted && <CountryGuesserStats updateStatsCallback={updateStats} />}
            <div className='btn-container'>
                <StartNewGame buttonText='Try again' />
                <Stats />
            </div>
        </div>
    );
}

export default CountryGuesserFailurePage;
