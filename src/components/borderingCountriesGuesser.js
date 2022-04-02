import React, { useState, useEffect } from 'react';
import BasicValidation from './guessFeedback/basicValidation';
import BorderingCountriesFeedback from './guessFeedback/borderingCountriesFeedback';
import FailurePage from './resultPages/failurePage';
import BorderingCountriesSuccessPage from './resultPages/borderingCountriesSuccessPage';
import CountryForm from './countryForm';
import checkValidGuess from '../helpers/countryValidation';
import { capitalizeText } from '../helpers/utils';

function borderingCountriesGuesser(props) {
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const map = props.map;

    const numberOfBorderingCountriesText = borderingCountries.length > 1
        ? `There are ${borderingCountries.length} bordering countries to find`
        : 'There is 1 bordering country to find';

    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [correctLastGuess, setCorrectLastGuess] = useState(false);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState([]);
    const [guessedActualCountry, setGuessedActualCountry] = useState(false);
    const [clues, setClues] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue([''])
        const guessedName = event.target[0].value.toLowerCase().trim();
        let { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(guessedName, possibleCountries, guesses);
        setCorrectLastGuess(false);
        if (guessedName === name.toLowerCase()) {
            setGuessedActualCountry(true);
            isValidCountry = false;
        } else {
            setGuessedActualCountry(false);
        }
        setKnownCountry(knownCountry);
        setDuplicateGuess(duplicateGuess);
        if (isValidCountry && knownCountry && !duplicateGuess) {
            checkGuessIsCorrect(guessedName);
        }
    };

    function checkGuessIsCorrect(guessedName) {
        const lowerCaseBorderingCountryArray = borderingCountries.map(country => country.toLowerCase());
        if (lowerCaseBorderingCountryArray.includes(guessedName)) {
            setCorrectGuesses([...correctGuesses, guessedName]);
            setCorrectLastGuess(true);
            if (correctGuesses.length + 1 === borderingCountries.length) {
                setSucceeded(true);
            }
        } else {
            setIncorrectGuesses([...incorrectGuesses, guessedName]);
            setIncorrectCount(incorrectCount + 1);
            setCorrectLastGuess(false);
        }
        setGuesses([...guesses, guessedName]);
    }

    function findStartingLetterOfBorders() {
        if (incorrectGuesses.length >= 4) {
            const startingLetters = [];
            borderingCountries.forEach((country) => {
                if (!correctGuesses.includes(country.toLowerCase())) {
                    const letter = country.charAt(0).toUpperCase();
                    startingLetters.push(letter);
                }
            });
            return capitalizeText(startingLetters);
        }
    }

    useEffect(() => {
        if (incorrectCount >= 6) {
            setFailed(true);
        }

        const clues = findStartingLetterOfBorders();
        setClues(clues);
    })

    return (
        <div id='borders'>
            {!succeeded && !failed && <div>
                <h2>Bordering Countries</h2>
                <p>Your country is: {name}</p>
                <p>{numberOfBorderingCountriesText}</p>
                <div id='borders-form'>
                    <CountryForm
                        possibleCountries={possibleCountries}
                        value={value}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>}
            {guesses.length > 0 && !failed && !succeeded && <BorderingCountriesFeedback
                correctGuesses={correctGuesses}
                incorrectGuesses={incorrectGuesses}
                incorrectCount={incorrectCount}
                borderingCountriesCount={borderingCountries.length}
            />}
            {!succeeded && !correctLastGuess && <div id='invalid-border-guess-feedback'>
                <BasicValidation
                    duplicateGuess={duplicateGuess}
                    knownCountry={knownCountry}
                />
                {guessedActualCountry && <p style={{ color: 'brown' }}>That's the actual country! Guess the bordering ones instead</p>}
            </div>}
            {!succeeded && !failed && clues && <div id='bordering-country-clues'>
                <p>The remaining bordering countries begin with the following letters: {clues.toString()}</p>
            </div>}
            {failed && !succeeded && <FailurePage
                name={name}
                map={map}
                correctGuesses={correctGuesses}
                borderingCountries={borderingCountries}
                guesses={guesses}
            />}
            {succeeded && <BorderingCountriesSuccessPage
                correctGuesses={correctGuesses}
                incorrectGuesses={incorrectGuesses}
                name={name}
                map={map}
                guesses={guesses}
            />}
        </div>
    );
}

export default borderingCountriesGuesser;
