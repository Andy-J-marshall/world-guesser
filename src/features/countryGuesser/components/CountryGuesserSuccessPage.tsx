import { useState } from 'react';
import BorderingCountriesGuesser from '../../borderingCountries/components/BorderingCountriesGuesser';
import Button from '../../../components/ui/Button';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';

interface CountryGuesserSuccessPageProps {
    countriesInfo: any;
    incorrectCount: number;
    guesses: string[];
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    flag: string;
}

function CountryGuesserSuccessPage({
    countriesInfo,
    incorrectCount,
    guesses,
    name,
    borderingCountries,
    possibleCountries,
    flag,
}: CountryGuesserSuccessPageProps) {
    const [newGameStarted, setNewGameStarted] = useState(false);
    const [borderingCountriesGameStarted, setBorderingCountriesGameStarted] = useState(false);
    const streak = useStreakManager('streak', 'increment');

    function startBorderingCountriesGame() {
        setBorderingCountriesGameStarted(true);
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
                            {!borderingCountriesGameStarted && (
                                <StartNewGame buttonText='Play again' variant='primary' />
                            )}
                            {borderingCountries.length > 0 && (
                                <Button
                                    callback={startBorderingCountriesGame}
                                    buttonText='Find the Borders'
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

            {newGameStarted && borderingCountriesGameStarted && (
                <BorderingCountriesGuesser
                    countriesInfo={countriesInfo}
                    name={name}
                    flag={flag}
                    borderingCountries={borderingCountries}
                    possibleCountries={possibleCountries}
                />
            )}
        </>
    );
}

export default CountryGuesserSuccessPage;
