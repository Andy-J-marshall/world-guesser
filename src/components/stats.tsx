import { useState } from 'react';
import Button from './button';
import { ListGroup } from 'react-bootstrap';
import allCountryStats from '../helpers/allCountryDefaultStats';

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
            <br />
            <Button
                callback={showStatsCallback}
                buttonText={buttonText}
            />
            {showStats && <div>
                <br />
                <h2>Country Guesser Stats</h2>
                <p>Total games: {numberOfCountryGuesserGames}</p>
                <p>Number of wins: {numberOfCountryGuesserWins}</p>
                {numberOfCountryGuesserWins > 0 && <p>Win percentage: {((numberOfCountryGuesserWins / numberOfCountryGuesserGames) * 100).toFixed(1)}%</p>}
                {numberOfCountryGuesserWins > 0 && <p>Number of guesses per correct answer: {(numberOfCountryGuesserAttempts / numberOfCountryGuesserWins).toFixed(1)}</p>}
                {numberOfCountryGuesserWins > 0 && <p>Streak: {countryGuesserStreak}</p>}
                <br />

                <h2>Bordering Countries Guesser Stats</h2>
                <p>Total games: {numberOfBorderGames}</p>
                <p>Number of wins: {numberOfBorderWins}</p>
                {numberOfBorderWins > 0 && <p>Win percentage: {((numberOfBorderWins / numberOfBorderGames) * 100).toFixed(1)}%</p>}
                {numberOfCorrectBorderAnswers > 0 && <p>Average number of correct answers per game: {(numberOfCorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>}
                {numberOfIncorrectBorderAnswers > 0 && <p>Average number of incorrect answers per game: {(numberOfIncorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>}
                {numberOfBorderWins > 0 && <p>Streak: {borderStreak}</p>}
                <br />

                <h2>Country Stats</h2>
                <ListGroup id='country-stats'>
                    {countryMap.map((c: any, index: number) => {
                        if (c.stats?.best || c.stats?.bestBorders) {
                            const countryGuesserHighScore = c.stats.best === 99 ? 'FAILED' : c.stats.best;
                            const borderingCountryHighScore = c.stats.bestBorders === 99 ? 'FAILED' : c.stats.bestBorders;
                            return < ListGroup.Item key={index}><b>{c.name}</b> <br />Country Guesser High Score: {countryGuesserHighScore || 'N/A'} <br />
                                Bordering Countries Guesser High Score: {borderingCountryHighScore || 'N/A'}</ListGroup.Item>
                        }
                        return null;
                    })}
                </ListGroup>
            </div>}
        </div>
    );
}

export default Stats;
