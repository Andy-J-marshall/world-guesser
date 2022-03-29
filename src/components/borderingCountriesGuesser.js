import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import BasicValidation from './guessFeedback/basicValidation';
import BorderingCountriesFeedback from './guessFeedback/borderingCountriesFeedback';
import FailurePage from './resultPages/failurePage';
import BorderingCountriesSuccessPage from './resultPages/borderingCountriesSuccessPage';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function borderingCountriesGuesser(props) {
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const map = props.map;

    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [correctLastGuess, setCorrectLastGuess] = useState(false);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [selectCountry, setSelectCountry] = useState([]);
    const [guessedActualCountry, setGuessedActualCountry] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const guessedName = event.target[0].value.toLowerCase().trim();
        let isValidCountry = false;

        // TODO this is really messy
        if (guessedName.length > 0) {
            if (guessedName === name.toLowerCase()) {
                setGuessedActualCountry(true);
                setCorrectLastGuess(false);
            } else {
                setGuessedActualCountry(false);
                possibleCountries.find(country => {
                    if (country.toLowerCase() === guessedName) {
                        setKnownCountry(true);
                        isValidCountry = true;
                    } else {
                        setDuplicateGuess(false);
                        setKnownCountry(false);
                    }
                });
            }
        } else {
            setKnownCountry(false);
            setDuplicateGuess(false);
        }

        if (isValidCountry) {
            setKnownCountry(true);
            if (!guesses.includes(guessedName)) {
                setDuplicateGuess(false);
                const lowerCaseBorderingCountryArray = borderingCountries.map(country => country.toLowerCase());
                if (lowerCaseBorderingCountryArray.includes(guessedName)) {
                    setCorrectGuesses([...correctGuesses, guessedName]);
                    setCorrectLastGuess(true);
                    // TODO why is this counter off by 1? Same as the one in countryGuesser
                    if (correctGuesses.length + 1 === borderingCountries.length) {
                        setSucceeded(true);
                    }
                } else {
                    setIncorrectGuesses([...incorrectGuesses, guessedName]);
                    setIncorrectCount(incorrectCount + 1);
                    setCorrectLastGuess(false);
                    if (incorrectCount >= 5) {
                        setFailed(true);
                    }
                }
                setGuesses([...guesses, guessedName]);
            } else {
                setDuplicateGuess(true);
            }
        }
    };

    return (
        <div id='borders'>
            {!succeeded && !failed && <div>
                <h2>Bordering Countries</h2>
                <p>Your country is: {name}</p>
                {/* TODO improve grammar if only 1 bordering country */}
                <p>There are {borderingCountries.length} bordering countries to find</p>
                <div id='borders-form'>
                    {<Form onSubmit={handleSubmit}>
                        <Fragment>
                            <Form.Group className='mb-3'>
                                <Form.Label>Guess the bordering countries</Form.Label>
                                <Typeahead
                                    id='bordering-countries-guesser'
                                    onChange={setSelectCountry}
                                    options={possibleCountries}
                                    placeholder='Select your country'
                                    selected={selectCountry}
                                />
                            </Form.Group>
                        </Fragment>
                        <Button variant='primary' type='submit'>
                            Guess
                        </Button>
                    </Form>}
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
            {failed && !succeeded && <FailurePage
                name={name}
                map={map}
                correctGuesses={correctGuesses}
                borderingCountriesCount={borderingCountries.length}
            />}
            {succeeded && <BorderingCountriesSuccessPage
                correctGuesses={correctGuesses}
                incorrectGuesses={incorrectGuesses}
                name={name}
                map={map}
            />}
        </div>
    );
}

export default borderingCountriesGuesser;
