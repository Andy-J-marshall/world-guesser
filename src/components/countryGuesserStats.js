import React, { useState, useEffect } from 'react';

function CountryGuesserStats(props) {
    const updateStats = props.updateStatsCallback;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttemptsForWins, setNumberOfAttemptsForWins] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);

    useEffect(() => {
        const { numberOfWins, numberOfGames, numberOfAttemptsForWins } = updateStats();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttemptsForWins(numberOfAttemptsForWins);
        localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins));
        localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames));
        localStorage.setItem('numberOfAttemptsForWins', JSON.stringify(numberOfAttemptsForWins));
    }, [updateStats]);

    return (
        <div id='country-guesser-stats'>
            <h1>Stats</h1>
            <p>Total games: {numberOfGames}</p>
            <p>Number of wins: {numberOfWins}</p>
            {numberOfGames > 0 && numberOfWins > 0 && <p>Win percentage: {((numberOfWins / numberOfGames) * 100).toFixed(1)}%</p>}
            {numberOfWins > 0 && numberOfAttemptsForWins > 0 && <p>Average number of guesses for correct answer: {(numberOfAttemptsForWins / numberOfWins).toFixed(1)}</p>}
        </div>
    );
}

export default CountryGuesserStats;
