import { useState } from 'react';
import Button from '../ui/Button';

function Stats() {
    const [showStats, setShowStats] = useState(false);
    const [buttonText, setButtonText] = useState('Show Stats');

    const numberOfCountryGuesserGames = JSON.parse(localStorage.getItem('numberOfGames') || 'null');
    const numberOfCountryGuesserWins = JSON.parse(localStorage.getItem('numberOfWins') || 'null');
    const numberOfCountryGuesserAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || 'null');
    const countryGuesserStreak = JSON.parse(localStorage.getItem('streak') || 'null');

    const numberOfBorderGames = JSON.parse(localStorage.getItem('numberOfBorderGames') || 'null');
    const numberOfBorderWins = JSON.parse(localStorage.getItem('numberOfBorderWins') || 'null');
    const numberOfCorrectBorderAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers') || 'null');
    const numberOfIncorrectBorderAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers') || 'null');
    const borderStreak = JSON.parse(localStorage.getItem('borderStreak') || 'null');

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
                <Button
                    callback={showStatsCallback}
                    buttonText={buttonText}
                />
            )}
            {showStats && (numberOfCountryGuesserGames > 0 || numberOfBorderGames > 0) && (
                <div className='stats-panel fade-in' style={{ maxWidth: '900px', margin: '0 auto', marginTop: 'var(--spacing-xl)' }}>
                {numberOfCountryGuesserGames > 0 && <div style={{ 
                    marginTop: 'var(--spacing-xl)',
                    background: 'rgba(30, 41, 59, 0.6)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-xl)',
                    border: '1px solid rgba(129, 140, 248, 0.3)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ 
                        fontSize: '2rem', 
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--color-primary-light)',
                        textAlign: 'center'
                    }}>Country Guesser Stats</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                        <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total games</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{numberOfCountryGuesserGames}</p>
                        </div>
                        <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Number of wins</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{numberOfCountryGuesserWins}</p>
                        </div>
                        {numberOfCountryGuesserWins > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Win percentage</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{((numberOfCountryGuesserWins / numberOfCountryGuesserGames) * 100).toFixed(1)}%</p>
                        </div>}
                        {numberOfCountryGuesserWins > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. guesses per win</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{(numberOfCountryGuesserAttempts / numberOfCountryGuesserWins).toFixed(1)}</p>
                        </div>}
                        {numberOfCountryGuesserWins > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Streak</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-warning)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{countryGuesserStreak}</p>
                        </div>}
                    </div>
                </div>}

                {numberOfBorderGames > 0 && <div style={{ 
                    marginTop: 'var(--spacing-xl)',
                    background: 'rgba(30, 41, 59, 0.6)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-xl)',
                    border: '1px solid rgba(129, 140, 248, 0.3)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <h2 style={{ 
                        fontSize: '2rem', 
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--color-primary-light)',
                        textAlign: 'center'
                    }}>Bordering Countries Guesser Stats</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                        <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total games</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{numberOfBorderGames}</p>
                        </div>
                        <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Number of wins</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{numberOfBorderWins}</p>
                        </div>
                        {numberOfBorderWins > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Win percentage</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{((numberOfBorderWins / numberOfBorderGames) * 100).toFixed(1)}%</p>
                        </div>}
                        {numberOfCorrectBorderAnswers > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. correct per game</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{(numberOfCorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>
                        </div>}
                        {numberOfIncorrectBorderAnswers > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. incorrect per game</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-error)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{(numberOfIncorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>
                        </div>}
                        {numberOfBorderWins > 0 && <div className='clue-box'>
                            <strong style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Streak</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-warning)', margin: '0.5rem 0 0 0', fontWeight: '700' }}>{borderStreak}</p>
                        </div>}
                    </div>
                </div>}
                </div>
            )}
        </>
    );
}

export default Stats;
