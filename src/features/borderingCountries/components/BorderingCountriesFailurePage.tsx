import StartNewGame from '../../../components/layout/StartNewGame';
import BorderingCountriesStats from './BorderingCountriesStats';
import Stats from '../../../components/layout/Stats';
import { capitalizeText } from '../../../lib/utils';

interface BorderingCountriesFailurePageProps {
    name: string;
    borderingCountries: string[];
    correctGuesses: string[];
    guesses: string[];
}

function BorderingCountriesFailurePage(props: BorderingCountriesFailurePageProps) {
    // TODO refactor to use props destructuring for bordering countries too
    const borderingCountries = props.borderingCountries;
    const correctGuesses = props.correctGuesses;
    const guesses = props.guesses;

    const incorrectCount = guesses.length - correctGuesses.length;
    const borderingCountriesCount = borderingCountries.length;
    const missingAnswersArray = borderingCountries.filter(
        (countryGuess) => !correctGuesses.includes(countryGuess.toLowerCase()),
    );

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfBorderWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfBorderGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfBorderAttempts') || '0') || 0;
        const numberOfCorrectAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers') || '0') || 0;
        const numberOfIncorrectAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers') || '0') || 0;
        const stats = {
            numberOfWins: numberOfWins,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            numberOfCorrectAnswers: numberOfCorrectAnswers + correctGuesses.length,
            numberOfIncorrectAnswers: numberOfIncorrectAnswers + incorrectCount,
            streak: 0,
        };
        return stats;
    }

    return (
        <div id='bordering-countries-failure-page'>
            {borderingCountries && (
                <div id='bordering-countries-failure'>
                    <p style={{ color: '#F66B0E' }}>You failed. Better luck next time</p>
                    {correctGuesses.length === 0 && (
                        <p>You found none of the bordering countries and missed {borderingCountriesCount}</p>
                    )}
                    {correctGuesses.length > 0 && (
                        <p>
                            You found {correctGuesses.length} of {borderingCountriesCount}
                        </p>
                    )}
                    {correctGuesses.length > 0 && <p>You found: {capitalizeText(correctGuesses)}</p>}
                    {missingAnswersArray && <p>You missed: {capitalizeText(missingAnswersArray)}</p>}
                    {<p>Your guesses were: {capitalizeText(guesses)}</p>}
                </div>
            )}
            <br />
            <BorderingCountriesStats updateStatsCallback={updateStats} />
            <div className='btn-container'>
                <StartNewGame buttonText='Try again' />
                <Stats />
            </div>
        </div>
    );
}

export default BorderingCountriesFailurePage;
