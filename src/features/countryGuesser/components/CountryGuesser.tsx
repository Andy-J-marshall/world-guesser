import { useState, useEffect } from 'react';
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
                    <h2>Guess the Mystery Country</h2>
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
                    <div id='country-info'>
                        <div className='clues-grid'>
                            <div className='clue-box'>
                                <p id='population'>
                                    <strong>Population:</strong> {population}
                                </p>
                            </div>
                            {incorrectCount >= 1 && (
                                <div className='clue-box fade-in'>
                                    <p id='region'>
                                        <strong>Region:</strong> {region}
                                    </p>
                                </div>
                            )}
                            {incorrectCount >= 2 && (
                                <div className='clue-box fade-in'>
                                    <p id='landlocked'>
                                        <strong>Landlocked:</strong> {landlocked}
                                    </p>
                                </div>
                            )}
                            {incorrectCount >= 3 && (
                                <div className='clue-box fade-in'>
                                    <p id='subregion'>
                                        <strong>Sub region:</strong> {subregion}
                                    </p>
                                </div>
                            )}
                            {incorrectCount >= 4 && (
                                <div className='clue-box fade-in'>
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
                            )}
                            {incorrectCount >= 5 && (
                                <div className='clue-box fade-in'>
                                    <p id='capital'>
                                        <strong>Capital city:</strong> {capital}
                                    </p>
                                </div>
                            )}
                        </div>
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
