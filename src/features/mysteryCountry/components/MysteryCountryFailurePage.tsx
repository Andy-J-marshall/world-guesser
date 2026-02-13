import { useEffect, useRef } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface MysteryCountryFailurePageProps {
    guesses: string[];
    onReset: () => void;
}

function MysteryCountryFailurePage({ guesses, onReset }: MysteryCountryFailurePageProps) {
    useStreakManager(STORAGE_KEYS.COUNTRY_STREAK, 'reset');
    const statsSaved = useRef(false);

    useEffect(() => {
        if (statsSaved.current) return;
        statsSaved.current = true;

        const currentGames = getStorageNumber(STORAGE_KEYS.COUNTRY_GAMES, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_GAMES, currentGames + 1);

        const currentAttempts = getStorageNumber(STORAGE_KEYS.COUNTRY_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_ATTEMPTS, currentAttempts + guesses.length);
    }, [guesses.length]);

    return (
        <GameResultLayout
            id='country-failure'
            heroContent={<div className='success-celebration'>Not quite!</div>}
            actions={<StartNewGame buttonText='Try again' onReset={onReset} />}
        >
            <AnswerHistory guesses={guesses} />
        </GameResultLayout>
    );
}

export default MysteryCountryFailurePage;
