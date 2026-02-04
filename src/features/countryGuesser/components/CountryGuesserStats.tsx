import { useState, useEffect } from 'react';
import { StatsDisplay } from '../../../components/layout/Stats';

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
            color: 'var(--color-primary-light)',
            backgroundColor: 'rgba(129, 140, 248, 0.1)',
        },
        {
            value: numberOfWins,
            label: 'Wins',
            color: 'var(--color-success)',
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
        },
        {
            value: numberOfAttempts,
            label: 'Total Guesses',
            color: 'rgb(251, 191, 36)',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
        },
        {
            value: (numberOfAttempts / numberOfGames).toFixed(1),
            label: 'Average Guesses',
            color: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
        {
            value: `${Math.round((numberOfWins / numberOfGames) * 100)}%`,
            label: 'Win Rate',
            color: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
        },
    ];

    return <StatsDisplay title='Stats' stats={stats} streak={numberOfWins > 0 ? streak : undefined} />;
}

export default CountryGuesserStats;
