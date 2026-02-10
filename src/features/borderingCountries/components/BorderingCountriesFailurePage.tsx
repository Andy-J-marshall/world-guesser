import { useEffect, useRef } from 'react';
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
    const statsSaved = useRef(false);

    useEffect(() => {
        if (statsSaved.current) return;
        statsSaved.current = true;

        const currentGames = getStorageNumber(STORAGE_KEYS.BORDER_GAMES, 0);
        setStorageValue(STORAGE_KEYS.BORDER_GAMES, currentGames + 1);

        const currentAttempts = getStorageNumber(STORAGE_KEYS.BORDER_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_ATTEMPTS, currentAttempts + guesses.length);

        const correctCount = correctGuesses.length;
        const incorrectCount = guesses.length - correctGuesses.length;

        const currentCorrect = getStorageNumber(STORAGE_KEYS.BORDER_CORRECT_ANSWERS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_CORRECT_ANSWERS, currentCorrect + correctCount);

        const currentIncorrect = getStorageNumber(STORAGE_KEYS.BORDER_INCORRECT_ANSWERS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_INCORRECT_ANSWERS, currentIncorrect + incorrectCount);
    }, [guesses.length, correctGuesses.length]);

    return (
        <GameResultLayout
            id='bordering-countries-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    {correctGuesses.length === 0 && <p className='failure-message'>No borders found. Keep trying!</p>}
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
