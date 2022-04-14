import React, { useState, useEffect } from 'react';

function BorderingCountriesStats(props) {
    const updateStats = props.updateStatsCallback;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
    const [streak, setStreak] = useState(0);
    
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
        localStorage.setItem('numberOfBorderWins', JSON.stringify(numberOfWins));
        localStorage.setItem('numberOfBorderGames', JSON.stringify(numberOfGames));
        localStorage.setItem('numberOfBorderAttempts', JSON.stringify(numberOfAttempts));
        localStorage.setItem('numberOfCorrectBorderAnswers', JSON.stringify(numberOfCorrectAnswers));
        localStorage.setItem('numberOfIncorrectBorderAnswers', JSON.stringify(numberOfIncorrectAnswers));
        localStorage.setItem('borderStreak', JSON.stringify(streak));
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfGames > 0 && numberOfAttempts > 0 && <div>
                <h1>Stats</h1>
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
