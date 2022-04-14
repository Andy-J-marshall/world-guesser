import React, { useState } from 'react';
import StartNewGame from '../startNewGame';
import BorderingCountriesStats from './borderingCountriesStats';
import { capitalizeText } from '../../helpers/utils';

function BorderingCountriesSuccessPage(props) {
    const countriesInfo = props.countriesInfo;
    const incorrectGuesses = props.incorrectGuesses;
    const correctGuesses = props.correctGuesses;
    const name = props.name;
    const map = props.map;
    const guesses = props.guesses;
    const incorrectCount = incorrectGuesses.length;
    const answerOrAnswers = incorrectCount === 1 ? 'answer' : 'answers';

    const messageText = correctGuesses.length === 1
        ? `Well done! You found the only bordering country of ${name} with ${incorrectCount} incorrect ${answerOrAnswers}`
        : `Well done! You found the ${correctGuesses.length} bordering countries of ${name} with ${incorrectCount} incorrect answers`;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfBorderWins')) || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfBorderGames')) || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfBorderAttempts')) || 0;
        const numberOfCorrectAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers')) || 0;
        const numberOfIncorrectAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers')) || 0;
        const streak = JSON.parse(localStorage.getItem('borderStreak')) || 0;
        const stats = {
            numberOfWins: numberOfWins + 1,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            numberOfCorrectAnswers: numberOfCorrectAnswers + correctGuesses.length,
            numberOfIncorrectAnswers: numberOfIncorrectAnswers + incorrectCount,
            streak: streak + 1,
        };
        return stats;
    }

    return (
        <div>
            {!newGameStarted && < div id='successful-bordering-countries-game' >
                <h5 style={{ color: 'green' }}>{messageText}</h5>
                <p>See <a href={map}>{name}</a> on the map</p>
                {<p>Your answer history was: {capitalizeText(guesses)}</p>}
            </div >}
            {!newGameStarted && <br />}
            {!newGameStarted && <BorderingCountriesStats
                updateStatsCallback={updateStats}
            />}
            <StartNewGame
                countriesInfo={countriesInfo}
                buttonText='Play again'
                callback={setNewGameStarted}
            />
        </div>
    )
}

export default BorderingCountriesSuccessPage;
