import React, { useState } from 'react';
import Button from './button';
import { ListGroup } from 'react-bootstrap';
import allCountryStats from '../helpers/allCountryDefaultStats';

function Stats() {
    const [showStats, setShowStats] = useState(false);
    const [buttonText, setButtonText] = useState('Show Stats');

    const countryBordersHighScores = JSON.parse(localStorage.getItem('countryHighScores')) || allCountryStats;
    const countryMap = Object.entries(countryBordersHighScores).map((countryObj) => {
        return {
            name: countryObj[0],
            stats: countryObj[1],
        }
    });
    const numberOfCountryGuesserGames = JSON.parse(localStorage.getItem('numberOfGames'));
    const numberOfCountryGuesserWins = JSON.parse(localStorage.getItem('numberOfWins'));
    const numberOfCountryGuesserAttempts = JSON.parse(localStorage.getItem('numberOfAttempts'));
    const countryGuesserStreak = JSON.parse(localStorage.getItem('streak'));

    const numberOfBorderGames = JSON.parse(localStorage.getItem('numberOfBorderGames'));
    const numberOfBorderWins = JSON.parse(localStorage.getItem('numberOfBorderWins'));
    const numberOfCorrectBorderAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers'));
    const numberOfIncorrectBorderAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers'));
    const borderStreak = JSON.parse(localStorage.getItem('borderStreak'));

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
                <h2>Country Guesser Stats</h2>
                <p>Total games: {numberOfCountryGuesserGames}</p>
                <p>Number of wins: {numberOfCountryGuesserWins}</p>
                {numberOfCountryGuesserWins > 0 && <p>Win percentage: {((numberOfCountryGuesserWins / numberOfCountryGuesserGames) * 100).toFixed(1)}%</p>}
                {numberOfCountryGuesserWins > 0 && <p>Number of guesses per correct answer: {(numberOfCountryGuesserAttempts / numberOfCountryGuesserWins).toFixed(1)}</p>}
                {numberOfCountryGuesserWins > 0 && <p>Streak: {countryGuesserStreak}</p>}

                <h2>Bordering Countries Guesser Stats</h2>
                <p>Total games: {numberOfBorderGames}</p>
                <p>Number of wins: {numberOfBorderWins}</p>
                {numberOfBorderWins > 0 && <p>Win percentage: {((numberOfBorderWins / numberOfBorderGames) * 100).toFixed(1)}%</p>}
                {numberOfCorrectBorderAnswers > 0 && <p>Average number of correct answers per game: {(numberOfCorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>}
                {numberOfIncorrectBorderAnswers > 0 && <p>Average number of incorrect answers per game: {(numberOfIncorrectBorderAnswers / numberOfBorderGames).toFixed(1)}</p>}
                {numberOfBorderWins > 0 && <p>Streak: {borderStreak}</p>}

                <h2>Country Stats</h2>
                <ListGroup>
                    {countryMap.map((c, index) => {
                        if (c.stats.best || c.stats.bestBorders) {
                            const countryGuesserHighScore = c.stats.best === 99 ? 'FAILED' : c.stats.best;
                            const borderingCountryHighScore = c.stats.bestBorders === 99 ? 'FAILED' : c.stats.bestBorders;
                            return < ListGroup.Item key={index}><b>{c.name}</b> <br />Country Guesser High Score: {countryGuesserHighScore || 'N/A'} <br />
                                Bordering Countries Guesser High Score: {borderingCountryHighScore || 'N/A'}</ListGroup.Item>
                        }
                    })}
                </ListGroup>
            </div>}
        </div>
    );
}

export default Stats;
