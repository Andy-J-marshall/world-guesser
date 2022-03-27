import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Country from './country';
import BorderingCountriesGuesser from './borderingCountriesGuesser';

function SuccessPage(props) {
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const countryCodeMapping = props.countryCodeMapping;
    const flag = props.flag;
    const map = props.map;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function startNewGame() {
        setNewGameStarted(true);
    }

    return (
        <div>
            {!newGameStarted && < div id='successful-guess' >
                {incorrectCount === 0 && <h5>Amazing! You got <a href={map}>{name}</a> in one!</h5>}
                {incorrectCount > 0 && <h5>Well done! It took you {incorrectCount + 1} attempts to get <a href={map}>{name}</a>!</h5>}
                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
                <p>Your answer history was: {guesses.toString()}</p>
            </div >}
            {!newGameStarted && borderingCountries && <BorderingCountriesGuesser
                name={name}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
                countryCodeMapping={countryCodeMapping}
                map={map}
            />}
            {!newGameStarted && <div id='new-game-button'>
                <br />
                <Button variant='primary' size='lg' onClick={startNewGame}>Try again</Button>
            </div>}
            {newGameStarted && <Country />}
            {/* TODO add a button to start guessing the bordering countries here as well? And make a component */}
        </div>
    )
}

export default SuccessPage;
