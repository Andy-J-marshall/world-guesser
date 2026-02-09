import { useState, useEffect } from 'react';
import { StatsDisplay } from '../../../components/layout/StatsDisplay';

/*
 * TODO: Future stats update logic reference:
 * 
 * function updateStats(guesses: string[]) {
 *     const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins') || '0') || 0;
 *     const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames') || '0') || 0;
 *     const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || '0') || 0;
 *     const streak = JSON.parse(localStorage.getItem('streak') || '0') || 0;
 *     const stats = {
 *         numberOfWins: numberOfWins + 1,
 *         numberOfGames: numberOfGames + 1,
 *         numberOfAttempts: numberOfAttempts + guesses.length,
 *         streak: streak + 1,
 *     };
 *     // Update localStorage with new stats
 *     localStorage.setItem('numberOfWins', JSON.stringify(stats.numberOfWins));
 *     localStorage.setItem('numberOfGames', JSON.stringify(stats.numberOfGames));
 *     localStorage.setItem('numberOfAttempts', JSON.stringify(stats.numberOfAttempts));
 *     localStorage.setItem('streak', JSON.stringify(stats.streak));
 *     return stats;
 * }
 * 
 * For failure: set streak to 0, don't increment numberOfWins
 */

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
