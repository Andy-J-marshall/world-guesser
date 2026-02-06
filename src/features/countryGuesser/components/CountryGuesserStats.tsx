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
            color: 'var(--color-primary-light)',
            backgroundColor: 'var(--color-overlay-primary-focus)',
        },
        {
            value: numberOfWins,
            label: 'Wins',
            color: 'var(--color-success)',
            backgroundColor: 'var(--color-overlay-success)',
        },
        {
            value: `${Math.round((numberOfWins / numberOfGames) * 100)}%`,
            label: 'Win Rate',
            color: 'var(--color-purple)',
            backgroundColor: 'var(--color-overlay-purple)',
        },
        {
            value: streak,
            label: 'Streak',
            color: 'var(--color-accent)',
            backgroundColor: 'var(--color-overlay-secondary-medium)',
        },
        {
            value: numberOfAttempts,
            label: 'Attempts',
            color: 'var(--color-warning)',
            backgroundColor: 'var(--color-overlay-warning)',
        },
        {
            value: (numberOfAttempts / numberOfGames).toFixed(1),
            label: 'Per Game',
            color: 'var(--color-blue)',
            backgroundColor: 'var(--color-overlay-blue)',
        },
    ];

    return <StatsDisplay title='Stats' stats={stats} streak={streak} />;
}

export default CountryGuesserStats;
