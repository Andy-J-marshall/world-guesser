import React, { useState, Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import FailurePage from './resultPages/failurePage';
import CountryGuesserSuccessPage from './resultPages/countryGuesserSuccessPage';
import BasicValidation from './guessFeedback/basicValidation';
import CountryGuessFeedback from './guessFeedback/countryGuessFeedback';

import 'react-bootstrap-typeahead/css/Typeahead.css';

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

    const [guessAttempted, setGuessAttempted] = useState(false);
    const [correctGuess, setCorrectGuess] = useState(false);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [selectCountry, setSelectCountry] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const guessedName = event.target[0].value.toLowerCase().trim();
        let isValidCountry = false;
        if (guessedName.length > 0) {
            possibleCountries.find(country => {
                if (country.toLowerCase() === guessedName) {
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

        if (isValidCountry) {
            setKnownCountry(true);
            if (!guesses.includes(guessedName)) {
                setDuplicateGuess(false);
                setGuessAttempted(true);
                if (guessedName === name.toLowerCase()) {
                    setCorrectGuess(true);
                } else {
                    setIncorrectCount(incorrectCount + 1)
                    setCorrectGuess(false);
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
                {incorrectCount >= 5 && <p>Capital city/cities = {capital}</p>}
            </div>}
            {/* TODO look into making the forms more generic and reusable */}
            <div id='country-form'>
                {!correctGuess && !failed && <Form onSubmit={handleSubmit}>
                    <Fragment>
                        <Form.Group className='mb-3'>
                            <Form.Label>Guess the country</Form.Label>
                            <Typeahead
                                id='country-search'
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
            <BasicValidation
                duplicateGuess={duplicateGuess}
                knownCountry={knownCountry}
            />
            {!correctGuess && guessAttempted && !failed && <CountryGuessFeedback
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
            />}
        </div >
    )
}

export default CountryGuesser;
