import React, { useState, useEffect } from 'react';
import FailurePage from './resultPages/failurePage';
import CountryGuesserSuccessPage from './resultPages/countryGuesserSuccessPage';
import BasicValidation from './guessFeedback/basicValidation';
import CountryGuessFeedback from './guessFeedback/countryGuessFeedback';
import CountryForm from './countryForm';
import CountryClues from './countryClues';
import checkValidGuess from '../helpers/countryValidation';

function CountryGuesser(props) {
    const name = props.name;
    const population = props.population;
    const flag = props.flag;
    const landlocked = props.landlocked;
    const region = props.region;
    const subregion = props.subregion;
    const map = props.map;
    const capital = props.capital;
    const possibleCountries = props.possibleCountries;
    const borderingCountries = props.borderingCountries;

    const [correctGuess, setCorrectGuess] = useState(false);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState(['']);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue(['']);
        const guessedName = event.target[0].value.toLowerCase().trim();
        const { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(guessedName, possibleCountries, guesses);
        setKnownCountry(knownCountry);
        setDuplicateGuess(duplicateGuess);
        if (isValidCountry && knownCountry && !duplicateGuess) {
            checkGuessIsCorrect(guessedName);
        }
    };

    function checkGuessIsCorrect(guessedName) {
        setKnownCountry(true);
        setDuplicateGuess(false);
        if (guessedName === name.toLowerCase()) {
            setCorrectGuess(true);
        } else {
            setIncorrectCount(incorrectCount + 1)
            setCorrectGuess(false);
        }
        setGuesses([...guesses, guessedName]);
    }

    useEffect(() => {
        if (incorrectCount >= 6) {
            setFailed(true);
        }
    })

    return (
        <div id='country-guesser' className='component'>
            {!failed && !correctGuess && <div id='country-info'>
                <h2>Mystery Country</h2>
                {<p>Population = {population}</p>}
                {incorrectCount >= 1 && <p>Region = {region}</p>}
                {incorrectCount >= 2 && <p>{landlocked}</p>}
                {incorrectCount >= 3 && <p>Sub region = {subregion}</p>}
                {incorrectCount >= 4 && <div>
                    <p>Flag: </p>
                    {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
                </div>}
                {incorrectCount >= 5 && <p>Capital city = {capital}</p>}
                {incorrectCount >= 5 && (region !== 'Europe') && <CountryClues
                    countryNameClue={name.charAt(0).toUpperCase()}
                />}
            </div>}
            <div id='country-form'>
                {!correctGuess && !failed && <CountryForm
                    possibleCountries={possibleCountries}
                    value={value}
                    setValue={setValue}
                    handleSubmit={handleSubmit}
                />}
            </div>
            <BasicValidation
                duplicateGuess={duplicateGuess}
                knownCountry={knownCountry}
            />
            {!correctGuess && guesses.length > 0 && !failed && <CountryGuessFeedback
                guesses={guesses}
                incorrectCount={incorrectCount}
                duplicateGuess={duplicateGuess}
            />}
            {correctGuess && !failed && <CountryGuesserSuccessPage
                name={name}
                map={map}
                flag={flag}
                incorrectCount={incorrectCount}
                guesses={guesses}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
            />}
            {failed && <FailurePage
                name={name}
                map={map}
                flag={flag}
                guesses={guesses}
            />}
        </div >
    )
}

export default CountryGuesser;
