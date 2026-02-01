import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CountryGuesserFailurePage from './CountryGuesserFailurePage';
import CountryGuesserSuccessPage from './CountryGuesserSuccessPage';
import BasicValidation from '../../../components/validation/BasicValidation';
import CountryGuessFeedback from './CountryGuesserFeedback';
import CountryForm from '../../../components/ui/CountryForm';
import checkValidGuess from '../../../lib/countryValidation';
import { CountryGuesserProps } from '../../../types';

function CountryGuesser(props: CountryGuesserProps) {
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
    const [guesses, setGuesses] = useState<string[]>([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState<string[]>(['']);
    const [guessedBorderingCountry, setGuessedBorderingCountry] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue(['']);
        const target = event.target as typeof event.target & {
            0: { value: string };
        };
        const guessedName = target[0].value.toLowerCase().trim();
        const { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(guessedName, possibleCountries, guesses);
        setKnownCountry(knownCountry);
        setDuplicateGuess(duplicateGuess);
        if (isValidCountry && knownCountry && !duplicateGuess) {
            checkGuessIsCorrect(guessedName);
        }
    };

    function checkGuessIsCorrect(guessedName: string) {
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

    function isGuessBorderingCountry(guessedName: string) {
        if (!correctGuess && borderingCountries.find((country: string) => country.toLowerCase() === guessedName)) {
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
        <div id='country-guesser' className='fade-in'>
            {!failed && !correctGuess && <>
                <div id='country-info'>
                    <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>Guess the Mystery Country</h2>
                    <Container>
                        <Row className="g-3 justify-content-center">
                            <Col md={6} lg={3}>
                                <div className="clue-box">
                                    <p id='population'><strong>Population:</strong> {population}</p>
                                </div>
                            </Col>
                            {incorrectCount >= 1 &&
                                <Col md={6} lg={3} className="fade-in">
                                    <div className="clue-box">
                                        <p id='region'><strong>Region:</strong> {region}</p>
                                    </div>
                                </Col>
                            }
                            {incorrectCount >= 2 &&
                                <Col md={6} lg={3} className="fade-in">
                                    <div className="clue-box">
                                        <p id='landlocked'>{landlocked}</p>
                                    </div>
                                </Col>
                            }
                            {incorrectCount >= 3 &&
                                <Col md={6} lg={3} className="fade-in">
                                    <div className="clue-box">
                                        <p id='subregion'><strong>Sub region:</strong> {subregion}</p>
                                    </div>
                                </Col>
                            }
                        </Row>
                        {incorrectCount >= 4 && 
                            <Row className="fade-in justify-content-center">
                                <Col md={6} lg={3}>
                                    <div className="clue-box mt-3">
                                        <p><strong>Flag:</strong></p>
                                        <img id='flag' src={flag} alt='Country Flag' style={{ width: '100%', maxWidth: '180px', marginTop: '0.5rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} />
                                    </div>
                                </Col>
                            </Row>
                        }
                        {incorrectCount >= 5 && 
                            <Row className="fade-in justify-content-center">
                                <Col md={6} lg={3}>
                                    <div className="clue-box mt-3">
                                        <p id='capital'><strong>Capital city:</strong> {capital}</p>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Container>
                </div>
                <div id='country-form'>
                    {!correctGuess && !failed && <CountryForm
                        possibleCountries={possibleCountries}
                        value={value}
                        setValue={setValue}
                        handleSubmit={handleSubmit}
                        duplicateGuess={duplicateGuess}
                        knownCountry={knownCountry}
                    />}
                    {!correctGuess && guesses.length > 0 && !failed && <CountryGuessFeedback
                        guesses={guesses}
                        incorrectCount={incorrectCount}
                        duplicateGuess={duplicateGuess}
                        guessedBorderingCountry={guessedBorderingCountry}
                    />}
                </div>
            </>}
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
