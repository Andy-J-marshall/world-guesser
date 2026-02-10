import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface BorderingCountriesSuccessPageProps {
    name: string;
    flag: string;
    correctGuesses: string[];
    guesses: string[];
    onReset: () => void;
}

function BorderingCountriesSuccessPage({
    name,
    flag,
    correctGuesses,
    guesses,
    onReset,
}: BorderingCountriesSuccessPageProps) {
    const totalBorders = correctGuesses.length;
    const streak = useStreakManager(STORAGE_KEYS.BORDER_STREAK, 'increment');

    useEffect(() => {
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

export default BorderingCountriesSuccessPage;
