import { useState, useEffect } from 'react';
import { StatsDisplay } from '../../../components/layout/StatsDisplay';

interface StatsResult {
    numberOfWins: number;
    numberOfGames: number;
    numberOfAttempts: number;
    streak: number;
}

interface CountryGuesserStatsProps {
    updateStatsCallback: () => StatsResult;
}

function CountryGuesserStats({ updateStatsCallback }: CountryGuesserStatsProps) {
    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const { numberOfWins, numberOfGames, numberOfAttempts, streak } = updateStatsCallback();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        setStreak(streak);

        try {
            localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins));
            localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames));
            localStorage.setItem('numberOfAttempts', JSON.stringify(numberOfAttempts));
            localStorage.setItem('streak', JSON.stringify(streak));
        } catch (error) {
            console.log('Unable to update stats');
        }
    }, [updateStatsCallback]);

    if (numberOfAttempts === 0 || numberOfGames === 0) {
        return null;
    }

    const stats = [
        {
            value: numberOfGames,
            label: 'Games',
        },
        {
            value: numberOfWins,
            label: 'Wins',
        },
        {
            value: `${Math.round((numberOfWins / numberOfGames) * 100)}%`,
            label: 'Win Rate',
            highlight: true,
        },
        {
            value: streak,
            label: 'Streak',
        },
        {
            value: numberOfAttempts,
            label: 'Attempts',
        },
        {
            value: (numberOfAttempts / numberOfGames).toFixed(1),
            label: 'Per Game',
        },
    ];

    return <StatsDisplay title='Stats' stats={stats} streak={streak} />;
}

export default CountryGuesserStats;
