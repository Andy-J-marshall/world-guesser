import { useEffect, useRef } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface NeighboursSuccessPageProps {
    name: string;
    flag: string;
    correctGuesses: string[];
    guesses: string[];
    onReset: () => void;
}

function NeighboursSuccessPage({
    name,
    flag,
    correctGuesses,
    guesses,
    onReset,
}: NeighboursSuccessPageProps) {
    const totalBorders = correctGuesses.length;
    const streak = useStreakManager(STORAGE_KEYS.BORDER_STREAK, 'increment');
    const statsSaved = useRef(false);

    useEffect(() => {
        if (statsSaved.current) return;
        statsSaved.current = true;

        const currentWins = getStorageNumber(STORAGE_KEYS.BORDER_WINS, 0);
        setStorageValue(STORAGE_KEYS.BORDER_WINS, currentWins + 1);

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
            id='successful-bordering-countries-game'
            heroContent={
                <>
                    <div className='success-stat-number'>
                        {totalBorders === 1 ? 'Border found!' : `All ${totalBorders} borders found!`}
                    </div>
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Play again' onReset={onReset} />}
        >
            <AnswerHistory guesses={guesses} correctGuesses={correctGuesses} />
            <StreakDisplay streak={streak} />
        </GameResultLayout>
    );
}

export default NeighboursSuccessPage;
