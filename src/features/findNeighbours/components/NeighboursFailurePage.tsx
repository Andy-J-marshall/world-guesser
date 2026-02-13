import { useEffect, useRef, useMemo } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface NeighboursFailurePageProps {
    name: string;
    flag: string;
    borderingCountries: string[];
    correctGuesses: string[];
    guesses: string[];
    onReset: () => void;
}

function NeighboursFailurePage({ name, flag, borderingCountries, correctGuesses, guesses, onReset }: NeighboursFailurePageProps) {
    const borderingCountriesCount = borderingCountries.length;
    useStreakManager(STORAGE_KEYS.BORDER_STREAK, 'reset');
    const statsSaved = useRef(false);

    const missedBorders = useMemo(() => {
        const correctGuessesLower = correctGuesses.map((g) => g.toLowerCase());
        return borderingCountries.filter((border) => !correctGuessesLower.includes(border.toLowerCase()));
    }, [borderingCountries, correctGuesses]);

    useEffect(() => {
        if (statsSaved.current) return;
        statsSaved.current = true;

        const currentGames = getStorageNumber(STORAGE_KEYS.BORDER_GAMES, 0);
        setStorageValue(STORAGE_KEYS.BORDER_GAMES, currentGames + 1);

        const currentAttempts = getStorageNumber(STORAGE_KEYS.BORDER_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_ATTEMPTS, currentAttempts + guesses.length);

        const correctCount = correctGuesses.length;
        const incorrectCount = borderingCountriesCount - correctCount;

        const currentCorrect = getStorageNumber(STORAGE_KEYS.BORDER_CORRECT_ANSWERS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_CORRECT_ANSWERS, currentCorrect + correctCount);

        const currentIncorrect = getStorageNumber(STORAGE_KEYS.BORDER_INCORRECT_ANSWERS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_INCORRECT_ANSWERS, currentIncorrect + incorrectCount);
    }, [guesses.length, correctGuesses.length, borderingCountriesCount]);

    return (
        <GameResultLayout
            id='bordering-countries-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    {correctGuesses.length === 0 && <p className='failure-message'>No neighbours found. Keep trying!</p>}
                    {correctGuesses.length > 0 && (
                        <p className='failure-message'>
                            {correctGuesses.length} of {borderingCountriesCount} neighbours found.
                        </p>
                    )}
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Try again' onReset={onReset} />}
        >
            {guesses.length > 0 && <AnswerHistory guesses={guesses} correctGuesses={correctGuesses} />}
            {missedBorders.length > 0 && (
                <AnswerHistory
                    guesses={missedBorders}
                    title={`Missed ${missedBorders.length === 1 ? 'Neighbour' : 'Neighbours'}:`}
                />
            )}
        </GameResultLayout>
    );
}

export default NeighboursFailurePage;
