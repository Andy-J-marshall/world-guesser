import React, { useState } from 'react';
import BorderingCountriesGuesser from '../borderingCountriesGuesser';
import PlayButton from '../playButton';

function CountryGuesserSuccessPage(props) {
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const countryCodeMapping = props.countryCodeMapping;
    const flag = props.flag;
    const map = props.map;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function startBorderingCountriesGame() {
        setNewGameStarted(true);
    }

    // TODO improve wording e.g. if only 1 bordering country
    return (
        <div>
            {!newGameStarted && < div id='successful-country-game' >
                {incorrectCount === 0 && <h5>Amazing! You got <a href={map}>{name}</a> in one!</h5>}
                {incorrectCount > 0
                    // TODO for some reason the H5 isn't appearing?
                    && <h5>Well done! It took you {incorrectCount + 1} attempts to get <a href={map}>{name}</a>!</h5>
                    && <p>Your answer history was: {guesses.toString()}</p>
                }
                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
            </div >}
            {newGameStarted && borderingCountries && <BorderingCountriesGuesser
                name={name}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
                countryCodeMapping={countryCodeMapping}
                map={map}
            />}
            {!newGameStarted && <PlayButton
                callback={startBorderingCountriesGame}
                buttonText='Guess the bordering countries'
            />}
        </div>
    )
}

export default CountryGuesserSuccessPage;
