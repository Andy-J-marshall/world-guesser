import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountryGuesserFailurePage from './CountryGuesserFailurePage';
import CountryGuesserSuccessPage from './CountryGuesserSuccessPage';
import CountryGuessFeedback from './CountryGuesserFeedback';
import CountryForm from '../../../components/ui/CountryForm';
import checkValidGuess from '../../../lib/countryValidation';
import { parseFormGuess } from '../../../lib/formUtils';
import { CountryGuesserProps } from '../../../types';
import { MAX_ATTEMPTS_COUNTRY_GUESSER } from '../../../constants';

function CountryGuesser({ countriesInfo, country, possibleCountries }: CountryGuesserProps) {
    const { name, population, flag, landlocked, region, subregion, capital, borderingCountries } = country;

    const [correctGuess, setCorrectGuess] = useState(false);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState<string[]>(['']);
    const [guessedBorderingCountry, setGuessedBorderingCountry] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue(['']);

        const guessedName = parseFormGuess(event);
        const { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(
            guessedName,
            possibleCountries,
            guesses,
        );

        setKnownCountry(knownCountry);
        setDuplicateGuess(duplicateGuess);

        if (isValidCountry && knownCountry && !duplicateGuess) {
            checkGuessIsCorrect(guessedName);
        }
    };

    function checkGuessIsCorrect(guessedName: string) {
        if (guessedName === name.toLowerCase()) {
            setCorrectGuess(true);
        } else {
            setIncorrectCount(incorrectCount + 1);
            setCorrectGuess(false);
            isGuessBorderingCountry(guessedName);
        }
        setGuesses([...guesses, guessedName]);
    }

    function isGuessBorderingCountry(guessedName: string) {
        if (!correctGuess && borderingCountries.find((country: string) => country.toLowerCase() === guessedName)) {
            setGuessedBorderingCountry(true);
        } else {
            setGuessedBorderingCountry(false);
        }
    }

    useEffect(() => {
        if (incorrectCount >= MAX_ATTEMPTS_COUNTRY_GUESSER) {
            setFailed(true);
        }
    }, [incorrectCount]);

    return (
        <div id='country-guesser' className='fade-in'>
            {!failed && !correctGuess && (
                <>
                    <div id='country-info'>
                        <h2 className='heading-margin-xl'>Guess the Mystery Country</h2>
                        <Container>
                            <Row className='g-3 justify-content-center'>
                                <Col md={6} lg={3}>
                                    <div className='clue-box'>
                                        <p id='population'>
                                            <strong>Population:</strong> {population}
                                        </p>
                                    </div>
                                </Col>
                                {incorrectCount >= 1 && (
                                    <Col md={6} lg={3} className='fade-in'>
                                        <div className='clue-box'>
                                            <p id='region'>
                                                <strong>Region:</strong> {region}
                                            </p>
                                        </div>
                                    </Col>
                                )}
                                {incorrectCount >= 2 && (
                                    <Col md={6} lg={3} className='fade-in'>
                                        <div className='clue-box'>
                                            <p id='landlocked'>
                                                <strong>Landlocked:</strong> {landlocked}
                                            </p>
                                        </div>
                                    </Col>
                                )}
                                {incorrectCount >= 3 && (
                                    <Col md={6} lg={3} className='fade-in'>
                                        <div className='clue-box'>
                                            <p id='subregion'>
                                                <strong>Sub region:</strong> {subregion}
                                            </p>
                                        </div>
                                    </Col>
                                )}
                                {incorrectCount >= 4 && (
                                    <Col md={6} lg={3} className='fade-in'>
                                        <div className='clue-box'>
                                            <p>
                                                <strong>Flag:</strong>
                                            </p>
                                            <img
                                                id='flag'
                                                src={flag}
                                                alt='Country Flag'
                                                className='clue-flag'
                                            />
                                        </div>
                                    </Col>
                                )}
                                {incorrectCount >= 5 && (
                                    <Col md={6} lg={3} className='fade-in'>
                                        <div className='clue-box'>
                                            <p id='capital'>
                                                <strong>Capital city:</strong> {capital}
                                            </p>
                                        </div>
                                    </Col>
                                )}
                            </Row>
                        </Container>
                    </div>
                    <div id='country-form'>
                        {!correctGuess && !failed && (
                            <CountryForm
                                possibleCountries={possibleCountries}
                                value={value}
                                setValue={setValue}
                                handleSubmit={handleSubmit}
                                duplicateGuess={duplicateGuess}
                                knownCountry={knownCountry}
                            />
                        )}
                        {!correctGuess && guesses.length > 0 && !failed && (
                            <CountryGuessFeedback
                                guesses={guesses}
                                incorrectCount={incorrectCount}
                                duplicateGuess={duplicateGuess}
                                guessedBorderingCountry={guessedBorderingCountry}
                            />
                        )}
                    </div>
                </>
            )}
            {correctGuess && !failed && (
                <CountryGuesserSuccessPage
                    countriesInfo={countriesInfo}
                    name={name}
                    flag={flag}
                    incorrectCount={incorrectCount}
                    guesses={guesses}
                    borderingCountries={borderingCountries}
                    possibleCountries={possibleCountries}
                />
            )}
            {failed && <CountryGuesserFailurePage name={name} flag={flag} guesses={guesses} />}
        </div>
    );
}

export default CountryGuesser;
