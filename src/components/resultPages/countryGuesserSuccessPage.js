import React, { useState, useEffect } from 'react';
import BorderingCountriesGuesser from '../borderingCountriesGuesser';
import PlayButton from '../playButton';
import StartNewGame from '../startNewGame';
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

    // TODO do something better with this?
    const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins')) || 0;
    const numberOfAttemptsForWins = JSON.parse(localStorage.getItem('numberOfAttemptsForWins')) || 0;
    const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames')) || 0;
    useEffect(() => {
        console.log('THE SUCCESS USEEFFECT')
        localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins + 1));
        localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames + 1));
        localStorage.setItem('numberOfAttemptsForWins', JSON.stringify(numberOfAttemptsForWins + guesses.length));
    }, [name]);

    return (
        <div>
            {!newGameStarted && < div id='successful-country-game' >
                {incorrectCount === 0 && <h5 style={{ color: 'green' }}>Amazing! You got <a href={map}>{name}</a> in one!</h5>}
                {incorrectCount > 0 && <h5 style={{ color: 'green' }}>Well done! It took you {incorrectCount + 1} attempts to get <a href={map}>{name}</a></h5>}
                {incorrectCount > 0 && <p>Your answer history was: {capitalizeText(guesses)}</p>}
                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
            </div >}
            {!newGameStarted && <br />}

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
