import { useState, useEffect, useRef } from 'react';
import NeighboursGuesser from '../../findNeighbours/components/NeighboursGuesser';
import Button from '../../../components/ui/Button';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';
import { getStorageNumber, setStorageValue } from '../../../lib/storageUtils';

interface MysteryCountrySuccessPageProps {
    countriesInfo: any;
    incorrectCount: number;
    guesses: string[];
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    flag: string;
    onReset: () => void;
}

function MysteryCountrySuccessPage({
    countriesInfo,
    incorrectCount,
    guesses,
    name,
    borderingCountries,
    possibleCountries,
    flag,
    onReset,
}: MysteryCountrySuccessPageProps) {
    const [newGameStarted, setNewGameStarted] = useState(false);
    const [neighboursGameStarted, setNeighboursGameStarted] = useState(false);
    const streak = useStreakManager(STORAGE_KEYS.COUNTRY_STREAK, 'increment');
    const statsSaved = useRef(false);

    useEffect(() => {
        if (statsSaved.current) return;
        statsSaved.current = true;

        const currentWins = getStorageNumber(STORAGE_KEYS.COUNTRY_WINS, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_WINS, currentWins + 1);

        const currentGames = getStorageNumber(STORAGE_KEYS.COUNTRY_GAMES, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_GAMES, currentGames + 1);

        const currentAttempts = getStorageNumber(STORAGE_KEYS.COUNTRY_ATTEMPTS, 0);
        setStorageValue(STORAGE_KEYS.COUNTRY_ATTEMPTS, currentAttempts + guesses.length);
    }, [guesses.length]);

    function startNeighboursGame() {
        setNeighboursGameStarted(true);
        setNewGameStarted(true);
    }

    const guessCount = guesses.length;

    const getSubtext = () => {
        if (guessCount === 1) return 'Perfect!';
        if (guessCount <= 3) return 'Excellent!';
        if (guessCount <= 6) return 'Nice work!';
        return 'You got it!';
    };

    return (
        <>
            {!newGameStarted && (
                <GameResultLayout
                    id='successful-country-game'
                    heroContent={
                        <>
                            <div className='success-celebration'>{getSubtext()}</div>
                            <div className='success-stat-number'>
                                {guessCount} {guessCount === 1 ? 'GUESS' : 'GUESSES'}
                            </div>
                            <CountryDisplay name={name} flag={flag} />
                        </>
                    }
                    actions={
                        <>
                            {!neighboursGameStarted && (
                                <StartNewGame buttonText='Play again' variant='primary' onReset={onReset} />
                            )}
                            {borderingCountries.length > 0 && (
                                <Button
                                    callback={startNeighboursGame}
                                    buttonText='Find the Neighbours'
                                    variant='light'
                                />
                            )}
                        </>
                    }
                >
                    {incorrectCount > 0 && <AnswerHistory guesses={guesses} />}
                    <StreakDisplay streak={streak} />
                </GameResultLayout>
            )}

            {newGameStarted && neighboursGameStarted && (
                <NeighboursGuesser
                    countriesInfo={countriesInfo}
                    name={name}
                    flag={flag}
                    borderingCountries={borderingCountries}
                    possibleCountries={possibleCountries}
                    onReset={onReset}
                />
            )}
        </>
    );
}

export default MysteryCountrySuccessPage;
