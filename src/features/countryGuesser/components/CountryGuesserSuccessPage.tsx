import { useState, useEffect } from 'react';
import BorderingCountriesGuesser from '../../borderingCountries/components/BorderingCountriesGuesser';
import Button from '../../../components/ui/Button';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';

interface CountryGuesserSuccessPageProps {
    countriesInfo: any;
    incorrectCount: number;
    guesses: string[];
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    flag: string;
}

function CountryGuesserSuccessPage(props: CountryGuesserSuccessPageProps) {
    const countriesInfo = props.countriesInfo;
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const flag = props.flag;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [borderingCountriesGameStarted, setBorderingCountriesGameStarted] = useState(false);
    const [streak, setStreak] = useState(0);

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

    useEffect(() => {
        const currentStreak = JSON.parse(localStorage.getItem('streak') || '0') || 0;
        setStreak(currentStreak + 1);

        try {
            localStorage.setItem('streak', JSON.stringify(currentStreak + 1));
        } catch (error) {
            console.log('Unable to update streak');
        }
    }, []);

    return (
        <>
            {!newGameStarted && (
                <div className='fade-in'>
                    <div id='successful-country-game' className='game-container success-page-container'>
                        <div className='success-stat-hero'>
                            <div className='success-stat-number'>
                                {guessCount} {guessCount === 1 ? 'GUESS' : 'GUESSES'}
                            </div>
                            <div className='success-country-display'>
                                <img src={flag} className='success-flag' alt={`${name} flag`} />
                                <div className='success-country-name'>{name}</div>
                            </div>
                            <div className='success-subtext'>{getSubtext()}</div>
                        </div>
                        <div className='btn-container'>
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
                        </div>
                        <StreakDisplay streak={streak} />
                        {incorrectCount > 0 && (
                            <div className='answer-history-container'>
                                <p className='answer-history-title'>Your answer history:</p>
                                <div className='answer-history-grid'>
                                    {guesses.map((guess, index) => (
                                        <span key={index} className='answer-badge'>
                                            {index + 1}. {guess}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {newGameStarted && borderingCountriesGameStarted && (
                <BorderingCountriesGuesser
                    countriesInfo={countriesInfo}
                    name={name}
                    borderingCountries={borderingCountries}
                    possibleCountries={possibleCountries}
                />
            )}
        </>
    );
}

export default CountryGuesserSuccessPage;
