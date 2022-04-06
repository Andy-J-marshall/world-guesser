import React from 'react';

function CountryGuesserStats(props) {
    // TODO handle 0/ null when displaying info
    // TODO handle decimal places
    // TODO handle realtime changes using useEffect?
    const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins')) || 0;
    const numberOfAttemptsForWins = JSON.parse(localStorage.getItem('numberOfAttemptsForWins')) || 0;
    const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames')) || 0;

    return (
        <div id='country-guesser-stats'>
            <h1>Country Guesser Stats</h1>
            <p>Total games: {numberOfGames}</p>
            <p>Number of wins: {numberOfWins}</p>
            {numberOfGames > 0 && numberOfWins > 0 && <p>Win percentage: {(numberOfWins / numberOfGames) * 100}%</p>}
            {numberOfWins > 0 && numberOfAttemptsForWins > 0 && <p>Average number of guesses for correct answer: {numberOfAttemptsForWins / numberOfWins}</p>}
        </div>
    );
}

export default CountryGuesserStats;
