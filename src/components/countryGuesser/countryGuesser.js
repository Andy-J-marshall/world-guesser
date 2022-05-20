import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountryGuesserFailurePage from './countryGuesserFailurePage';
import CountryGuesserSuccessPage from './countryGuesserSuccessPage';
import BasicValidation from '../basicValidation';
import CountryGuessFeedback from './countryGuesserFeedback';
import CountryForm from '../countryForm';
import checkValidGuess from '../../helpers/countryValidation';

function CountryGuesser(props) {
    const countriesInfo = props.countriesInfo;
    const country = props.country;
    const possibleCountries = props.possibleCountries;

    const name = country.name;
    const population = country.population;
    const flag = country.flag;
    const landlocked = country.landlocked;
    const region = country.region;
    const subregion = country.subregion;
    const map = country.map;
    const capital = country.capital;
    const borderingCountries = country.borderingCountries;

    const [correctGuess, setCorrectGuess] = useState(false);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState(['']);
    const [guessedBorderingCountry, setGuessedBorderingCountry] = useState(false);

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
            isGuessBorderingCountry(guessedName);
        }
        setGuesses([...guesses, guessedName]);
    }

    function isGuessBorderingCountry(guessedName) {
        if (!correctGuess && borderingCountries.find(country => country.toLowerCase() === guessedName)) {
            setGuessedBorderingCountry(true);
        } else {
            setGuessedBorderingCountry(false);
        }
    }

    useEffect(() => {
        if (incorrectCount >= 6) {
            setFailed(true);
        }
    })

    return (
        <div id='country-guesser' className='component'>
            {!failed && !correctGuess && <div id='country-info'>
                <h2>Guess the Mystery Country</h2>
                <br />
                <Container>
                    <Row>
                        <Col>
                            {<p>Population: {population}</p>}
                        </Col>
                        <Col>
                            {incorrectCount >= 1 && <p>Region: {region}</p>}
                        </Col>
                        <Col>
                            {incorrectCount >= 2 && <p>{landlocked}</p>}
                        </Col>
                        <Col>
                            {incorrectCount >= 3 && <p>Sub region: {subregion}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {incorrectCount >= 4 && <div>
                                <p>Flag: </p>
                                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
                            </div>}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br />
                            {incorrectCount >= 5 && <p>Capital city: {capital}</p>}
                        </Col>
                    </Row>
                </Container>
            </div>}
            <div id='country-form'>
                <br />
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
                guessedBorderingCountry={guessedBorderingCountry}
            />}
            {correctGuess && !failed && <CountryGuesserSuccessPage
                countriesInfo={countriesInfo}
                name={name}
                map={map}
                flag={flag}
                incorrectCount={incorrectCount}
                guesses={guesses}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
            />}
            {failed && <CountryGuesserFailurePage
                countriesInfo={countriesInfo}
                name={name}
                map={map}
                flag={flag}
                guesses={guesses}
            />}
        </div >
    )
}

export default CountryGuesser;
