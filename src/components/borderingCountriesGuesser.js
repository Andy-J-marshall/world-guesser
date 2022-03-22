import React, { Fragment, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function borderingCountriesGuesser(props) {
    const possibleCountries = props.possibleCountries;
    const borderingCountries = props.borderingCountries;

    // TODO will all these be used?
    const [guessAttempted, setGuessAttempted] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState('');
    const [selectCountry, setSelectCountry] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue('');
        const guessedName = event.target[0].value.toLowerCase().trim();
        let isValidCountry = false;
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

        // TODO this will need to find the code from the country code mapping

        if (isValidCountry) {
            if (!guesses.includes(guessedName)) {
                setDuplicateGuess(false);
                setGuessAttempted(true);
                const lowerCaseCountryArray = borderingCountries.map(country => country.toLowerCase());
                if (lowerCaseCountryArray.includes(guessedName)) {
                    setCorrectGuesses([...correctGuesses, guessedName]);
                } else {
                    setIncorrectGuesses(guessedName);
                    setIncorrectCount(incorrectCount + 1);
                    setCorrectGuess(false);
                    if (incorrectCount === 5) {
                        setFailed(true);
                    }
                }
                setGuesses([...guesses, guessedName]);
            } else {
                setDuplicateGuess(true);
            }
        }
    };

    function changeValue(text) {
        setValue(text.value);
    }

    return (
        <div id='borders'>
            <h2>Bordering Countries</h2>
            <div id='borders-form'>
                {<Form onSubmit={handleSubmit}>
                    <br />
                    <Fragment>
                        <Form.Group className='mb-3'>
                            <Form.Label>Guess the bordering countries</Form.Label>
                            {/* <Form.Control type='text' onChange={changeValue} value={value} /> TODO add the value thing back in? */}
                            <Typeahead
                                id='bordering-countries-guesser'
                                onChange={setSelectCountry}
                                options={possibleCountries}
                                placeholder="Select your country"
                                selected={selectCountry}
                            />
                        </Form.Group>
                    </Fragment>
                    <Button variant='primary' type='submit'>
                        Guess
                    </Button>
                </Form>}
            </div>
            <p>Correct guesses so far: {correctGuesses.toString()}</p>
            <p>Incorrect guesses so far: {incorrectGuesses.toString()}</p>
            {/* TODO complete this */}
        </div>
    );
}

export default borderingCountriesGuesser;
