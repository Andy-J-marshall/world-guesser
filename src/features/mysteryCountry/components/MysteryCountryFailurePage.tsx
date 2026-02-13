import { useEffect, useRef } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';
import { MAX_ATTEMPTS_MYSTERY_COUNTRY } from '../../../constants/game';

interface MysteryCountryFailurePageProps {
    name: string;
    flag: string;
    guesses: string[];
    incorrectCount: number;
    onReset: () => void;
}

function MysteryCountryFailurePage({ name, flag, guesses, incorrectCount, onReset }: MysteryCountryFailurePageProps) {
    useStreakManager(STORAGE_KEYS.COUNTRY_STREAK, 'reset');
    const statsSaved = useRef(false);

    useEffect(() => {
        if (statsSaved.current) return;
        statsSaved.current = true;

        const currentGames = getStorageNumber(STORAGE_KEYS.COUNTRY_GAMES, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_GAMES, currentGames + 1);

        const attemptsToRecord = Math.max(guesses.length, incorrectCount);
        const currentAttempts = getStorageNumber(STORAGE_KEYS.COUNTRY_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_ATTEMPTS, currentAttempts + attemptsToRecord);
    }, [guesses.length, incorrectCount]);

    return (
        <GameResultLayout
            id='country-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    <p>All {MAX_ATTEMPTS_MYSTERY_COUNTRY} attempts used. The answer was:</p>
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Try again' onReset={onReset} />}
        >
            {guesses.length > 0 && <AnswerHistory guesses={guesses} />}
        </GameResultLayout>
    );
}

export default MysteryCountryFailurePage;
