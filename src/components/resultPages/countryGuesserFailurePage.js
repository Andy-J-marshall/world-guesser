import React, { useState, useEffect } from 'react';
import StartNewGame from '../startNewGame';
import CountryGuesserStats from '../countryGuesserStats';
import { capitalizeText } from '../../helpers/utils';

function CountryGuesserFailurePage(props) {
    const countriesInfo = props.countriesInfo;
    const name = props.name;
    const flag = props.flag;
    const map = props.map;
    const guesses = props.guesses;

    const [newGameStarted, setNewGameStarted] = useState(false);

    // TODO do something better with this?
    const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames')) || 0;
    useEffect(() => {
        localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames + 1));
    }, [name]);

    return (
        <div id='failure-page'>
            {!newGameStarted && < div id='country-failure' >
                <p style={{ color: 'red' }}>You failed. Better luck next time</p>
                {<p>The answer was <a href={map}>{name}</a></p>}
                {<p>Your answer history was: {capitalizeText(guesses)}</p>}
                <img style={{ border: 'solid' }} src={flag} alt='Country Flag' />
            </div >}
            {!newGameStarted && <br />}
            {!newGameStarted && <CountryGuesserStats />}
            <StartNewGame
                countriesInfo={countriesInfo}
                buttonText='Try again'
                callback={setNewGameStarted}
            />
        </div>
    )
}

export default CountryGuesserFailurePage;
