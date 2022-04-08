import React, { useState, useEffect } from 'react';

function CountryGuesserStats(props) {
    const updateStats = props.updateStatsCallback;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);

    const called = true;

    useEffect(() => {
        const { numberOfWins, numberOfGames, numberOfAttempts } = updateStats();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins));
        localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames));
        localStorage.setItem('numberOfAttempts', JSON.stringify(numberOfAttempts));
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfAttempts > 0 && numberOfGames > 0 && <div>
                <h1>Stats</h1>
                <p>Total games: {numberOfGames}</p>
                <p>Number of wins: {numberOfWins}</p>
                {numberOfWins > 0 && <p>Win percentage: {((numberOfWins / numberOfGames) * 100).toFixed(1)}%</p>}
                {numberOfWins > 0 && <p>Number of guesses per correct answer: {(numberOfAttempts / numberOfWins).toFixed(1)}</p>}
            </div>}
        </div>
    );
}

export default CountryGuesserStats;
