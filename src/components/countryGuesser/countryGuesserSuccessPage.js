import React, { useState } from 'react';
import BorderingCountriesGuesser from '../borderingCountries/borderingCountriesGuesser';
import PlayButton from '../playButton';
import StartNewGame from '../startNewGame';
import CountryGuesserStats from '../countryGuesser/countryGuesserStats';
import { capitalizeText } from '../../helpers/utils';

function CountryGuesserSuccessPage(props) {
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
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins')) || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames')) || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts')) || 0;
        const streak = JSON.parse(localStorage.getItem('streak')) || 0;
        const stats = {
            numberOfWins: numberOfWins + 1,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            streak: streak + 1,
        };
        return stats;
    }

    return (
        <div>
            {!newGameStarted && < div id='successful-country-game' >
                {incorrectCount === 0 && <h5 style={{ color: 'green' }}>Amazing! You got <a href={map}>{name}</a> in one!</h5>}
                {incorrectCount > 0 && <h5 style={{ color: 'green' }}>Well done! It took you {incorrectCount + 1} attempts to get <a href={map}>{name}</a></h5>}
                {incorrectCount > 0 && <p>Your answer history was: {capitalizeText(guesses)}</p>}
                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
            </div >}
            {!newGameStarted && <br />}
            {!newGameStarted && <CountryGuesserStats
                updateStatsCallback={updateStats}
            />}
            {!newGameStarted && borderingCountries.length > 0 && <PlayButton
                callback={startBorderingCountriesGame}
                buttonText='Guess the bordering countries'
            />}
            {!borderingCountriesGameStarted && <StartNewGame
                countriesInfo={countriesInfo}
                buttonText='Play again'
                callback={startNewGame}
            />}
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
