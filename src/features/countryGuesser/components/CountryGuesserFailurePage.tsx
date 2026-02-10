import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface CountryGuesserFailurePageProps {
    name: string;
    flag: string;
    guesses: string[];
    onReset: () => void;
}

function CountryGuesserFailurePage({ name, flag, guesses, onReset }: CountryGuesserFailurePageProps) {
    useStreakManager(STORAGE_KEYS.COUNTRY_STREAK, 'reset');

    useEffect(() => {
        const currentGames = getStorageNumber(STORAGE_KEYS.COUNTRY_GAMES, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_GAMES, currentGames + 1);

        const currentAttempts = getStorageNumber(STORAGE_KEYS.COUNTRY_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_ATTEMPTS, currentAttempts + guesses.length);
    }, [guesses.length]);

    return (
        <GameResultLayout
            id='country-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Try again' onReset={onReset} />}
        >
            <AnswerHistory guesses={guesses} />
        </GameResultLayout>
    );
}

export default CountryGuesserFailurePage;
