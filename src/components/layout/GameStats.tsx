import { useState, useEffect } from 'react';
import { StatsDisplay } from './StatsDisplay';
import { getStorageNumber } from '../../lib/storageUtils';

interface StorageKeys {
    wins: string;
    games: string;
    attempts: string;
    streak: string;
    correctAnswers?: string;
    incorrectAnswers?: string;
}

interface GameStatsProps {
    title: string;
    storageKeys: StorageKeys;
}

function GameStats({ title, storageKeys }: GameStatsProps) {
    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
    const [numberOfIncorrectAnswers, setNumberOfIncorrectAnswers] = useState(0);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const wins = getStorageNumber(storageKeys.wins, 0);
        const games = getStorageNumber(storageKeys.games, 0);
        const attempts = getStorageNumber(storageKeys.attempts, 0);
        const currentStreak = getStorageNumber(storageKeys.streak, 0);

        setNumberOfWins(wins);
        setNumberOfGames(games);
        setNumberOfAttempts(attempts);
        setStreak(currentStreak);

        if (storageKeys.correctAnswers) {
            const correct = getStorageNumber(storageKeys.correctAnswers, 0);
            setNumberOfCorrectAnswers(correct);
        }

        if (storageKeys.incorrectAnswers) {
            const incorrect = getStorageNumber(storageKeys.incorrectAnswers, 0);
            setNumberOfIncorrectAnswers(incorrect);
        }
    }, [storageKeys]);

    if (numberOfAttempts === 0 || numberOfGames === 0) {
        return (
            <div className='stats-display-container'>
                <div className='stats-display-card'>
                    <h3 className='stats-display-title'>{title}</h3>
                    <div className='stats-empty-state'>
                        <p className='stats-empty-message'>No games played yet</p>
                    </div>
                </div>
            </div>
        );
    }

    const baseStats = [
        { value: numberOfGames, label: 'Games' },
        { value: numberOfWins, label: 'Wins' },
        { value: `${Math.round((numberOfWins / numberOfGames) * 100)}%`, label: 'Win Rate', highlight: true },
        { value: streak, label: 'Streak' },
    ];

    const gameSpecificStats = storageKeys.correctAnswers
        ? [
              { value: numberOfCorrectAnswers, label: 'Correct' },
              { value: numberOfIncorrectAnswers, label: 'Incorrect' },
          ]
        : [
              { value: numberOfAttempts, label: 'Attempts' },
              { value: Number((numberOfAttempts / numberOfGames).toFixed(1)), label: 'Per Game' },
          ];

    const allStats = baseStats.concat(gameSpecificStats);

    return <StatsDisplay title={title} stats={allStats} streak={streak} />;
}

export default GameStats;
