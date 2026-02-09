import { useState, useEffect } from 'react';
import { StatsDisplay } from '../../../components/layout/StatsDisplay';

/*
 * TODO: Future stats update logic reference:
 * 
 * function updateStats(guesses: string[], correctGuesses: string[], incorrectCount: number) {
 *     const numberOfWins = JSON.parse(localStorage.getItem('numberOfBorderWins') || '0') || 0;
 *     const numberOfGames = JSON.parse(localStorage.getItem('numberOfBorderGames') || '0') || 0;
 *     const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfBorderAttempts') || '0') || 0;
 *     const numberOfCorrectAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers') || '0') || 0;
 *     const numberOfIncorrectAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers') || '0') || 0;
 *     const streak = JSON.parse(localStorage.getItem('borderStreak') || '0') || 0;
 *     const stats = {
 *         numberOfWins: numberOfWins + 1,
 *         numberOfGames: numberOfGames + 1,
 *         numberOfAttempts: numberOfAttempts + guesses.length,
 *         numberOfCorrectAnswers: numberOfCorrectAnswers + correctGuesses.length,
 *         numberOfIncorrectAnswers: numberOfIncorrectAnswers + incorrectCount,
 *         streak: streak + 1,
 *     };
 *     // Update localStorage with new stats
 *     localStorage.setItem('numberOfBorderWins', JSON.stringify(stats.numberOfWins));
 *     localStorage.setItem('numberOfBorderGames', JSON.stringify(stats.numberOfGames));
 *     localStorage.setItem('numberOfBorderAttempts', JSON.stringify(stats.numberOfAttempts));
 *     localStorage.setItem('numberOfCorrectBorderAnswers', JSON.stringify(stats.numberOfCorrectAnswers));
 *     localStorage.setItem('numberOfIncorrectBorderAnswers', JSON.stringify(stats.numberOfIncorrectAnswers));
 *     localStorage.setItem('borderStreak', JSON.stringify(stats.streak));
 *     return stats;
 * }
 * 
 * For failure: don't increment numberOfWins, set streak to 0
 */

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

function BorderingCountriesStats({ updateStatsCallback }: BorderingCountriesStatsProps) {
    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const {
            numberOfWins,
            numberOfGames,
            numberOfAttempts,
            numberOfCorrectAnswers,
            numberOfIncorrectAnswers,
            streak,
        } = updateStatsCallback();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        setNumberOfCorrectAnswers(numberOfCorrectAnswers);
        setNumberOfIncorrectAnswers(numberOfIncorrectAnswers);
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
    }, [updateStatsCallback]);

    if (numberOfGames === 0 || numberOfAttempts === 0) {
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
            value: numberOfCorrectAnswers,
            label: 'Correct',
        },
        {
            value: numberOfIncorrectAnswers,
            label: 'Incorrect',
        },
    ];

    return <StatsDisplay title='Stats' stats={stats} streak={streak} />;
}

export default BorderingCountriesStats;
