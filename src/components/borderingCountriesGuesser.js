import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function borderingCountriesGuesser(props) {
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const countryCodeMapping = props.countryCodeMapping;

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
                    if (country.label.toLowerCase() === guessedName) {
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

        // Some countries aren't appearing in answerCountries due to the codes mismatch
        if (isValidCountry) {
            setKnownCountry(true);
            const answerCountries = [];
            borderingCountries.forEach(borderingCountry => {
                countryCodeMapping.find(country => {
                    // TODO can I do a second check for a different kind of code?
                    if (country.code === borderingCountry) {
                        answerCountries.push(country.name);
                    }
                })
            });

            if (!guesses.includes(guessedName)) {
                setDuplicateGuess(false);
                const lowerCaseBorderingCountryArray = answerCountries.map(country => country.toLowerCase());
                if (lowerCaseBorderingCountryArray.includes(guessedName)) {
                    setCorrectGuesses([...correctGuesses, guessedName]);
                    setCorrectLastGuess(true);
                    // TODO why is this counter off by 1? Same as the one in countryGuesser
                    if (correctGuesses.length + 1 === answerCountries.length) {
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
            <h2>Bordering Countries</h2>
            <p>Your country is: {name}</p>
            <p>There are {borderingCountries.length} bordering countries to find</p>
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
            {guesses.length > 0 && !failed && !succeeded && <p>Correct guesses so far: {correctGuesses.toString()}</p>}
            {guesses.length > 0 && !failed && !succeeded && <p>Incorrect guesses so far: {incorrectGuesses.toString()}</p>}
            {!succeeded && !correctLastGuess && <div id='invalid-border-guess-feedback'>
                {duplicateGuess && <p style={{ color: 'brown' }}>You've already tried that country!</p>}
                {!knownCountry && <p style={{ color: 'brown' }}>Enter a valid country name</p>}
                {guessedActualCountry && <p style={{ color: 'brown' }}>That's the actual country! Guess the bordering ones instead</p>}
            </div>}
            {!succeeded && guesses.length > 0 && !failed && <div id='lives-counter'>
                <p>You have {6 - incorrectCount} lives remaining</p>
                <p>There are {borderingCountries.length - correctGuesses.length} bordering countries remaining</p>
            </div>}
            {/* TODO complete this and use the components */}
            {failed && <p>FAILED!!</p>}
            {succeeded && <p>SUCCESS!!</p>}
        </div>
    );
}

export default borderingCountriesGuesser;
