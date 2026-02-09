import { useState, useEffect } from 'react';
import { StatsDisplay } from './StatsDisplay';

interface StorageKeys {
    wins: string;
    games: string;
    attempts: string;
    streak: string;
    correctAnswers?: string;
    incorrectAnswers?: string;
}

interface GameStatsProps {
    storageKeys: StorageKeys;
}

function GameStats({ storageKeys }: GameStatsProps) {
    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const wins = JSON.parse(localStorage.getItem(storageKeys.wins) || '0') || 0;
        const games = JSON.parse(localStorage.getItem(storageKeys.games) || '0') || 0;
        const attempts = JSON.parse(localStorage.getItem(storageKeys.attempts) || '0') || 0;
        const currentStreak = JSON.parse(localStorage.getItem(storageKeys.streak) || '0') || 0;

        setNumberOfWins(wins);
        setNumberOfGames(games);
        setNumberOfAttempts(attempts);
        setStreak(currentStreak);

        if (storageKeys.correctAnswers) {
            const correct = JSON.parse(localStorage.getItem(storageKeys.correctAnswers) || '0') || 0;
            setNumberOfCorrectAnswers(correct);
        }

        if (storageKeys.incorrectAnswers) {
            const incorrect = JSON.parse(localStorage.getItem(storageKeys.incorrectAnswers) || '0') || 0;
            setNumberOfIncorrectAnswers(incorrect);
        }
    }, [storageKeys]);

    if (numberOfAttempts === 0 || numberOfGames === 0) {
        return null;
    }

    const baseStats = [
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
    ];

    if (storageKeys.correctAnswers && numberOfCorrectAnswers > 0) {
        baseStats.push(
            {
                value: numberOfCorrectAnswers,
                label: 'Correct',
            },
            {
                value: numberOfIncorrectAnswers,
                label: 'Incorrect',
            },
        );
    }

    baseStats.push(
        {
            value: numberOfAttempts,
            label: 'Attempts',
        },
        {
            value: Number((numberOfAttempts / numberOfGames).toFixed(1)),
            label: 'Per Game',
        },
    );

    return <StatsDisplay title='Stats' stats={baseStats} streak={streak} />;
}

export default GameStats;
