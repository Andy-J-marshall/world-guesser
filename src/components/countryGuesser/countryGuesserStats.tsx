import { useState, useEffect } from 'react';
import allCountryStats from '../../helpers/allCountryDefaultStats';

interface StatsResult {
    numberOfWins: number;
    numberOfGames: number;
    numberOfAttempts: number;
    streak: number;
}

interface CountryGuesserStatsProps {
    updateStatsCallback: () => StatsResult;
    country: string;
    numberOfGuesses: number;
    succeeded: boolean;
}

function CountryGuesserStats(props: CountryGuesserStatsProps) {
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
        const { numberOfWins, numberOfGames, numberOfAttempts, streak } = updateStats();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        setStreak(streak);

        try {
            localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins));
            localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames));
            localStorage.setItem('numberOfAttempts', JSON.stringify(numberOfAttempts));
            localStorage.setItem('streak', JSON.stringify(streak));

            const countryHighScores = JSON.parse(localStorage.getItem('countryHighScores') || '{}') || allCountryStats;
            if (succeeded) {
                const previousBestScore = countryHighScores[country].best;
                if (!previousBestScore || numberOfGuesses < previousBestScore) {
                    countryHighScores[country].best = numberOfGuesses;
                    setHighScore(true);
                }
            } else {
                countryHighScores[country].best = 99;
            }
            localStorage.setItem('countryHighScores', JSON.stringify(countryHighScores));
        } catch (error) {
            console.log('Unable to update stats');
        }
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfAttempts > 0 && numberOfGames > 0 && <div>
                <h2>Stats</h2>
                {succeeded && highScore && <p>That was your best score for {country}!</p>}
                <p>Total games: {numberOfGames}</p>
                <p>Number of wins: {numberOfWins}</p>
                {numberOfWins > 0 && streak > 0 && <p>You are on a {streak} game winning streak playing Country Guesser</p>}
            </div>}
        </div>
    );
}

export default CountryGuesserStats;
