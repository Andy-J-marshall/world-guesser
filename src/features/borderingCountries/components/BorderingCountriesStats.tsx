import { useState, useEffect } from 'react';

interface BorderStats {
    numberOfWins: number;
    numberOfGames: number;
    numberOfAttempts: number;
    numberOfCorrectAnswers: number;
    numberOfIncorrectAnswers: number;
    streak: number;
}

interface BorderingCountriesStatsProps {
    updateStatsCallback: () => BorderStats;
}

function BorderingCountriesStats(props: BorderingCountriesStatsProps) {
    const updateStats = props.updateStatsCallback;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [streak, setStreak] = useState(0);

    const called = true;

    useEffect(() => {
        const { numberOfWins, numberOfGames, numberOfAttempts, numberOfCorrectAnswers, numberOfIncorrectAnswers, streak } =
            updateStats();
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
        } catch (error) {
            console.log('Unable to update stats');
        }
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfGames > 0 && numberOfAttempts > 0 && (
                <div>
                    <h2>Stats</h2>
                    <p>Total games: {numberOfGames}</p>
                    <p>Number of wins: {numberOfWins}</p>
                    {numberOfWins > 0 && streak > 0 && (
                        <p>You are on a {streak} game winning streak playing Bordering Countries</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default BorderingCountriesStats;
