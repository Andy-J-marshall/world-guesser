import React, { useState } from 'react';
import BorderingCountriesGuesser from '../borderingCountriesGuesser';
import PlayButton from '../playButton';
import Country from '../country';
import getAllCountriesRequest from '../../helpers/allCountriesRequest';
import { capitalizeText } from '../../helpers/utils';

function CountryGuesserSuccessPage(props) {
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const flag = props.flag;
    const map = props.map;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [borderingCountriesGameStarted, setBorderingCountriesGameStarted] = useState(false);
    const [newCountryFinderGameStarted, setNewCountryFinderGameStarted] = useState(false);
    const [allCountriesResponse, setAllCountriesResponse] = useState();

    function startBorderingCountriesGame() {
        setBorderingCountriesGameStarted(true);
        setNewGameStarted(true);
    }

    async function startNewGame() {
        setNewCountryFinderGameStarted(true);
        setNewGameStarted(true);
        const response = await getAllCountriesRequest();
        setAllCountriesResponse(response);
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

            {!newGameStarted && borderingCountries.length > 0 && <PlayButton
                callback={startBorderingCountriesGame}
                buttonText='Guess the bordering countries'
            />}
            {newGameStarted && borderingCountriesGameStarted && <BorderingCountriesGuesser
                name={name}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
                map={map}
            />}

            {!newGameStarted && <br />}

            {!newGameStarted && <PlayButton
                callback={startNewGame}
                buttonText='Play again'
            />}
            {newGameStarted && allCountriesResponse && newCountryFinderGameStarted && <Country
                countriesInfo={allCountriesResponse}
            />}
        </div>
    )
}

export default CountryGuesserSuccessPage;