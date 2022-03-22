import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function borderingCountriesGuesser(props) {
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const countryCodeMapping = props.countryCodeMapping;

    // TODO will all these be used?
    const [guessAttempted, setGuessAttempted] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [correctGuess, setCorrectGuess] = useState(false);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [selectCountry, setSelectCountry] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const guessedName = event.target[0].value.toLowerCase().trim();
        let isValidCountry = false;

        // TODO move this if/else code somewhere so it can be shared?
        if (guessedName.length > 0) {
            possibleCountries.find(country => {
                if (country.label.toLowerCase() === guessedName) {
                    setKnownCountry(true);
                    isValidCountry = true;
                } else {
                    setDuplicateGuess(false);
                    setGuessAttempted(false);
                    setKnownCountry(false);
                }
            });
        } else {
            setKnownCountry(false);
            setGuessAttempted(false);
            setDuplicateGuess(false);
        }

        // TODO make sure this works with countries such as Greenland/ Kosovo etc.
        if (isValidCountry) {
            const answerCountries = [];
            borderingCountries.forEach(borderingCountry => {
                countryCodeMapping.find(country => {
                    if (country.code === borderingCountry) {
                        answerCountries.push(country.name);
                    }
                })
            });
            if (!guesses.includes(guessedName)) {
                setDuplicateGuess(false);
                setGuessAttempted(true);
                const lowerCaseBorderingCountryArray = answerCountries.map(country => country.toLowerCase());
                if (lowerCaseBorderingCountryArray.includes(guessedName)) {
                    setCorrectGuesses([...correctGuesses, guessedName]);
                    // TODO why is this counter off by 1? Same as the one in countryGuesser
                    if (correctGuesses.length + 1 === answerCountries.length) {
                        setSucceeded(true);
                    }
                } else {
                    setIncorrectGuesses([...incorrectGuesses, guessedName]);
                    setIncorrectCount(incorrectCount + 1);
                    setCorrectGuess(false); // TODO do I need this?
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
            <h2>Bordering Countries</h2>
            <p>Your country is: {name}</p>
            <div id='borders-form'>
                {<Form onSubmit={handleSubmit}>
                    <br />
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
            <br />
            {/* TODO make a bigger deal about correct and incorrect guesses e.g. colours etc. */}
            <p>Correct guesses so far: {correctGuesses.toString()}</p>
            <p>Incorrect guesses so far: {incorrectGuesses.toString()}</p>
            {/* TODO complete this */}
            {failed && <p>FAILED!!</p>}
            {succeeded && <p>SUCCESS!!</p>}
        </div>
    );
}

export default borderingCountriesGuesser;
