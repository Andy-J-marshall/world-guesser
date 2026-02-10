import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface BorderingCountriesFailurePageProps {
    borderingCountries: string[];
    correctGuesses: string[];
    guesses: string[];
    onReset: () => void;
}

function BorderingCountriesFailurePage({
    borderingCountries,
    correctGuesses,
    guesses,
    onReset,
}: BorderingCountriesFailurePageProps) {
    const borderingCountriesCount = borderingCountries.length;
    useStreakManager(STORAGE_KEYS.BORDER_STREAK, 'reset');

    useEffect(() => {
        // Increment games
        const currentGames = getStorageNumber(STORAGE_KEYS.BORDER_GAMES, 0);
        setStorageValue(STORAGE_KEYS.BORDER_GAMES, currentGames + 1);

        // Add attempts
        const currentAttempts = getStorageNumber(STORAGE_KEYS.BORDER_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_ATTEMPTS, currentAttempts + guesses.length);
    }, [guesses.length]);

    return (
        <GameResultLayout
            id='bordering-countries-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    {correctGuesses.length === 0 && (
                        <p className='failure-message'>No borders found. Keep trying!</p>
                    )}
                    {correctGuesses.length > 0 && (
                        <p className='failure-message'>
                            {correctGuesses.length} of {borderingCountriesCount} borders found.
                        </p>
                    )}
                </>
            }
            actions={<StartNewGame buttonText='Try again' onReset={onReset} />}
        >
            <AnswerHistory guesses={guesses} correctGuesses={correctGuesses} />
        </GameResultLayout>
    );
}

export default BorderingCountriesFailurePage;
