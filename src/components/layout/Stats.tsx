import { useState } from 'react';
import Button from '../ui/Button';
import { ListGroup } from 'react-bootstrap';
import allCountryStats from '../../constants/allCountryDefaultStats';

function Stats() {
    const [showStats, setShowStats] = useState(false);
    const [buttonText, setButtonText] = useState('Show Stats');

    const countryBordersHighScores = JSON.parse(localStorage.getItem('countryHighScores') || '{}') || allCountryStats;
    const countryMap = Object.entries(countryBordersHighScores).map((countryObj) => {
        return {
            name: countryObj[0],
            stats: countryObj[1],
        }
    });
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
        <div id='stats-page'>
            <Button
                callback={showStatsCallback}
                buttonText={buttonText}
            />
            {showStats && <div className='fade-in'>
                <div className='card' style={{ marginTop: '2rem' }}>
                    <h2>📊 Country Guesser Stats</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                        <div className='clue-box'>
                            <strong>Total games</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0' }}>{numberOfCountryGuesserGames}</p>
                        </div>
                        <div className='clue-box'>
                            <strong>Number of wins</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '0.5rem 0 0 0' }}>{numberOfCountryGuesserWins}</p>
                        </div>
                        {numberOfCountryGuesserWins > 0 && <div className='clue-box'>
                            <strong>Win percentage</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0' }}>{((numberOfCountryGuesserWins / numberOfCountryGuesserGames) * 100).toFixed(1)}%</p>
                        </div>}
                        {numberOfCountryGuesserWins > 0 && <div className='clue-box'>
                            <strong>Avg. guesses per win</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0' }}>{(numberOfCountryGuesserAttempts / numberOfCountryGuesserWins).toFixed(1)}</p>
                        </div>}
                        {numberOfCountryGuesserWins > 0 && <div className='clue-box'>
                            <strong>Streak</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-warning)', margin: '0.5rem 0 0 0' }}>🔥 {countryGuesserStreak}</p>
                        </div>}
                    </div>
                </div>

                <div className='card' style={{ marginTop: '2rem' }}>
                    <h2>🌐 Bordering Countries Guesser Stats</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
                        <div className='clue-box'>
                            <strong>Total games</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0' }}>{numberOfBorderGames}</p>
                        </div>
                        <div className='clue-box'>
                            <strong>Number of wins</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '0.5rem 0 0 0' }}>{numberOfBorderWins}</p>
                        </div>
                        {numberOfBorderWins > 0 && <div className='clue-box'>
                            <strong>Win percentage</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-primary-light)', margin: '0.5rem 0 0 0' }}>{((numberOfBorderWins / numberOfBorderGames) * 100).toFixed(1)}%</p>
                        </div>}
                        {numberOfCorrectBorderAnswers > 0 && <div className='clue-box'>
                            <strong>Avg. correct per game</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-success)', margin: '0.5rem 0 0 0' }}>{(numberOfCorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>
                        </div>}
                        {numberOfIncorrectBorderAnswers > 0 && <div className='clue-box'>
                            <strong>Avg. incorrect per game</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-error)', margin: '0.5rem 0 0 0' }}>{(numberOfIncorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>
                        </div>}
                        {numberOfBorderWins > 0 && <div className='clue-box'>
                            <strong>Streak</strong>
                            <p style={{ fontSize: '2rem', color: 'var(--color-warning)', margin: '0.5rem 0 0 0' }}>🔥 {borderStreak}</p>
                        </div>}
                    </div>
                </div>

                <div className='card' style={{ marginTop: '2rem' }}>
                    <h2>🗺️ Country Stats</h2>
                    <ListGroup id='country-stats' style={{ marginTop: '1.5rem' }}>
                        {countryMap.map((c: any, index: number) => {
                            if (c.stats?.best || c.stats?.bestBorders) {
                                const countryGuesserHighScore = c.stats.best === 99 ? 'FAILED' : c.stats.best;
                                const borderingCountryHighScore = c.stats.bestBorders === 99 ? 'FAILED' : c.stats.bestBorders;
                                return <ListGroup.Item key={index}>
                                    <b>{c.name}</b>
                                    <br />
                                    <span style={{ color: 'var(--color-text-muted)' }}>
                                        Country Guesser High Score: <span style={{ color: 'var(--color-primary-light)' }}>{countryGuesserHighScore || 'N/A'}</span>
                                    </span>
                                    <br />
                                    <span style={{ color: 'var(--color-text-muted)' }}>
                                        Bordering Countries Guesser High Score: <span style={{ color: 'var(--color-primary-light)' }}>{borderingCountryHighScore || 'N/A'}</span>
                                    </span>
                                </ListGroup.Item>
                            }
                            return null;
                        })}
                    </ListGroup>
                </div>
            </div>}
        </div>
    );
}

export default Stats;
