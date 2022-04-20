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
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
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
        setNumberOfCorrectAnswers(numberOfCorrectAnswers);
        setNumberOfIncorrectAnswers(numberOfIncorrectAnswers);
        setStreak(streak);

        try {
            localStorage.setItem('numberOfBorderWins', JSON.stringify(numberOfWins));
            localStorage.setItem('numberOfBorderGames', JSON.stringify(numberOfGames));
            localStorage.setItem('numberOfBorderAttempts', JSON.stringify(numberOfAttempts));
            localStorage.setItem('numberOfCorrectBorderAnswers', JSON.stringify(numberOfCorrectAnswers));
            localStorage.setItem('numberOfIncorrectBorderAnswers', JSON.stringify(numberOfIncorrectAnswers));
            localStorage.setItem('borderStreak', JSON.stringify(streak));

            // TODO check this works for success and failure
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
                <h1>Stats</h1>
                {succeeded && highScore && <p>That was your best score for {country}!</p>}
                <p>Total games: {numberOfGames}</p>
                <p>Number of wins: {numberOfWins}</p>
                {numberOfWins > 0 && <p>Win percentage: {((numberOfWins / numberOfGames) * 100).toFixed(1)}%</p>}
                {numberOfCorrectAnswers > 0 && <p>Average number of correct answers per game: {(numberOfCorrectAnswers / numberOfGames).toFixed(1)}</p>}
                {numberOfIncorrectAnswers > 0 && <p>Average number of incorrect answers per game: {(numberOfIncorrectAnswers / numberOfGames).toFixed(1)}</p>}
                {numberOfWins > 0 && streak > 0 && <p>You are on a {streak} game winning streak playing Bordering Countries</p>}
            </div>}
        </div>
    );
}

export default BorderingCountriesStats;
