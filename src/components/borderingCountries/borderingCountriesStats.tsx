import React, { useState, useEffect } from 'react';
import allCountryStats from '../../helpers/allCountryDefaultStats';

function BorderingCountriesStats(props) {
    const updateStats = props.updateStatsCallback;
    const country = props.country;
    const numberOfGuesses = props.numberOfGuesses;
    const succeeded = props.succeeded;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(false);

    const called = true;

    useEffect(() => {
        const {
            numberOfWins, numberOfGames, numberOfAttempts, numberOfCorrectAnswers, numberOfIncorrectAnswers, streak,
        } = updateStats();
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

            const countryBordersHighScores = JSON.parse(localStorage.getItem('countryHighScores')) || allCountryStats;
            if (succeeded) {
                const previousBestScore = countryBordersHighScores[country].bestBorders;
                if (!previousBestScore || numberOfGuesses < previousBestScore) {
                    countryBordersHighScores[country].bestBorders = numberOfGuesses;
                    setHighScore(true);
                }
            } else {
                countryBordersHighScores[country].bestBorders = 99;
            }
            localStorage.setItem('countryHighScores', JSON.stringify(countryBordersHighScores));
        } catch (error) {
            console.log('Unable to update stats');
        }
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfGames > 0 && numberOfAttempts > 0 && <div>
                <h2>Stats</h2>
                {succeeded && highScore && <p style={{ color: '#F66B0E' }}>That was your best score for {country}!</p>}
                <p>Total games: {numberOfGames}</p>
                <p>Number of wins: {numberOfWins}</p>
                {numberOfWins > 0 && streak > 0 && <p>You are on a {streak} game winning streak playing Bordering Countries</p>}
            </div>}
        </div>
    );
}

export default BorderingCountriesStats;
