import { useState } from 'react';
import BorderingCountriesGuesser from '../../borderingCountries/components/BorderingCountriesGuesser';
import Button from '../../../components/ui/Button';
import StartNewGame from '../../../components/layout/StartNewGame';
import CountryGuesserStats from './CountryGuesserStats';

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

    function startBorderingCountriesGame() {
        setBorderingCountriesGameStarted(true);
        setNewGameStarted(true);
    }

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || '0') || 0;
        const streak = JSON.parse(localStorage.getItem('streak') || '0') || 0;
        const stats = {
            numberOfWins: numberOfWins + 1,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            streak: streak + 1,
        };
        return stats;
    }

    return (
        <>
            {!newGameStarted && (
                <div className='fade-in'>
                    <div id='successful-country-game' className='game-container'>
                        <h2 className='success-title'>Success!</h2>
                        {incorrectCount === 0 && <p>Amazing! You got {name} in one!</p>}
                        {incorrectCount > 0 && (
                            <p>
                                Well done! It took you {guesses.length} attempts to get {name}
                            </p>
                        )}
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
                        <img src={flag} alt='Country Flag' className='flag-image' />
                    </div>
                </div>
            )}
            {!newGameStarted && (
                <div className='btn-container'>
                    {!borderingCountriesGameStarted && <StartNewGame buttonText='Play again' />}
                    {borderingCountries.length > 0 && (
                        <Button callback={startBorderingCountriesGame} buttonText='Guess the bordering countries' />
                    )}
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
            {!newGameStarted && <CountryGuesserStats updateStatsCallback={updateStats} />}
        </>
    );
}

export default CountryGuesserSuccessPage;
