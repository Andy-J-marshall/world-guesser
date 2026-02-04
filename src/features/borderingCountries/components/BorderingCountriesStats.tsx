import { useState, useEffect } from 'react';
import { StatsDisplay } from '../../../components/layout/StatsDisplay';

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
            value: numberOfCorrectAnswers,
            label: 'Correct Answers',
            color: 'var(--color-success)',
            backgroundColor: 'rgba(52, 211, 153, 0.1)',
        },
        {
            value: numberOfIncorrectAnswers,
            label: 'Incorrect Answers',
            color: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
        },
        {
            value: numberOfAttempts,
            label: 'Total Guesses',
            color: 'rgb(251, 191, 36)',
            backgroundColor: 'rgba(251, 191, 36, 0.1)',
        },
        {
            value: `${Math.round((numberOfWins / numberOfGames) * 100)}%`,
            label: 'Win Rate',
            color: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
        },
        {
            value: streak,
            label: 'Current Streak',
            color: 'var(--color-accent)',
            backgroundColor: 'rgba(192, 132, 252, 0.1)',
        }
    ];

    return <StatsDisplay title='Stats' stats={stats} streak={streak} />;
}

export default BorderingCountriesStats;
