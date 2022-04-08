import React, { useState } from 'react';
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

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins')) || 1;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames')) || 1;
        const numberOfAttemptsForWins = JSON.parse(localStorage.getItem('numberOfAttemptsForWins')) || 1;
        const stats = {
            numberOfWins,
            numberOfGames: numberOfGames + 1,
            numberOfAttemptsForWins,
        };
        return stats;
    }

    return (
        <div id='failure-page'>
            {!newGameStarted && < div id='country-failure' >
                <p style={{ color: 'red' }}>You failed. Better luck next time</p>
                {<p>The answer was <a href={map}>{name}</a></p>}
                {<p>Your answer history was: {capitalizeText(guesses)}</p>}
                <img style={{ border: 'solid' }} src={flag} alt='Country Flag' />
            </div >}
            {!newGameStarted && <br />}
            {!newGameStarted && <CountryGuesserStats
                updateStatsCallback={updateStats}
            />}
            <StartNewGame
                countriesInfo={countriesInfo}
                buttonText='Try again'
                callback={setNewGameStarted}
            />
        </div>
    )
}

export default CountryGuesserFailurePage;
