import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BorderingCountriesGuesser from '../../borderingCountries/components/BorderingCountriesGuesser';
import Button from '../../../components/ui/Button';
import StartNewGame from '../../../components/layout/StartNewGame';
import CountryGuesserStats from './CountryGuesserStats';
import { capitalizeText } from '../../../lib/utils';

interface CountryGuesserSuccessPageProps {
    countriesInfo: any;
    incorrectCount: number;
    guesses: string[];
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    flag: string;
    map: string;
}

function CountryGuesserSuccessPage(props: CountryGuesserSuccessPageProps) {
    const countriesInfo = props.countriesInfo;
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const flag = props.flag;
    const map = props.map;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [borderingCountriesGameStarted, setBorderingCountriesGameStarted] = useState(false);

    function startBorderingCountriesGame() {
        setBorderingCountriesGameStarted(true);
        setNewGameStarted(true);
    }

    async function startNewGame() {
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
        <div className='fade-in'>
            {!newGameStarted && <div className='card' id='successful-country-game'>
                <h2>Success!</h2>
                {incorrectCount === 0 && <h3 className='text-success'>Amazing! You got <a href={map} target="_blank" rel="noopener noreferrer">{name}</a> in one!</h3>}
                {incorrectCount > 0 && <h3 className='text-success'>Well done! It took you {incorrectCount + 1} attempts to get <a href={map} target="_blank" rel="noopener noreferrer">{name}</a></h3>}
                {incorrectCount > 0 && <p>Your answer history was: {capitalizeText(guesses)}</p>}
                <img src={flag} alt='Country Flag' style={{ maxWidth: '400px', marginTop: '1.5rem' }} />
            </div>}
            {!newGameStarted && <CountryGuesserStats
                updateStatsCallback={updateStats}
                country={name}
                numberOfGuesses={guesses.length}
                succeeded={true}
            />}

            <div className='btn-container'>
                {!borderingCountriesGameStarted && <StartNewGame
                    countriesInfo={countriesInfo}
                    buttonText='Play again'
                    callback={startNewGame}
                />}
                {borderingCountries.length > 0 && !newGameStarted && <Button
                    callback={startBorderingCountriesGame}
                    buttonText='Guess the bordering countries'
                />}
            </div>
            {newGameStarted && borderingCountriesGameStarted && <BorderingCountriesGuesser
                countriesInfo={countriesInfo}
                name={name}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
                map={map}
            />}
        </div>
    )
}

export default CountryGuesserSuccessPage;
