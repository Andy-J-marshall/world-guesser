import { useState } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import CountryGuesserStats from './CountryGuesserStats';
import { capitalizeText } from '../../../lib/utils';

interface CountryGuesserFailurePageProps {
    countriesInfo: any;
    name: string;
    flag: string;
    map: string;
    guesses: string[];
}

function CountryGuesserFailurePage(props: CountryGuesserFailurePageProps) {
    const countriesInfo = props.countriesInfo;
    const name = props.name;
    const flag = props.flag;
    const map = props.map;
    const guesses = props.guesses;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || '0') || 0;
        const stats = {
            numberOfWins,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            streak: 0,
        };
        return stats;
    }

    return (
        <div id='country-guesser-failure-page' className='fade-in'>
            {!newGameStarted && <div className='card' id='country-failure'>
                <h2>Game Over</h2>
                <p className='text-error'>You failed. Better luck next time!</p>
                <p>The answer was <a href={map} target="_blank" rel="noopener noreferrer" className='text-warning'>{name}</a></p>
                <p>Your answer history was: {capitalizeText(guesses)}</p>
                <img src={flag} alt='Country Flag' style={{ maxWidth: '400px', marginTop: '1.5rem' }} />
            </div>}
            {!newGameStarted && <CountryGuesserStats
                updateStatsCallback={updateStats}
                country={name}
                numberOfGuesses={guesses.length}
                succeeded={false}
            />}
            <StartNewGame
                countriesInfo={countriesInfo}
                buttonText='Try again'
                callback={() => setNewGameStarted(true)}
            />
        </div>
    )
}

export default CountryGuesserFailurePage;
