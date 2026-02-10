import { useState, useEffect } from 'react';
import CountryGuesserFailurePage from './CountryGuesserFailurePage';
import CountryGuesserSuccessPage from './CountryGuesserSuccessPage';
import CountryForm from '../../../components/ui/CountryForm';
import checkValidGuess from '../../../lib/countryValidation';
import { parseFormGuess } from '../../../lib/formUtils';
import { CountryGuesserProps } from '../../../types';
import { MAX_ATTEMPTS_COUNTRY_GUESSER } from '../../../constants';

interface CountryGuesserComponentProps extends CountryGuesserProps {
    onReset: () => void;
}

function CountryGuesser({ countriesInfo, country, possibleCountries, onReset }: CountryGuesserComponentProps) {
    const { name, population, flag, landlocked, region, subregion, capital, borderingCountries } = country;

    const [correctGuess, setCorrectGuess] = useState(false);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState<string[]>(['']);

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
        }
        setGuesses([...guesses, guessedName]);
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
                                isLastAttempt={incorrectCount === MAX_ATTEMPTS_COUNTRY_GUESSER - 1}
                            />
                        )}
                    </div>
                    <div id='country-info'>
                        <div className='clues-grid'>
                            {(incorrectCount >= 5 || incorrectCount === 4) && (
                                <div
                                    className={`clue-box ${incorrectCount >= 5 ? (incorrectCount === 5 ? 'latest-clue' : '') : 'locked'}`}
                                >
                                    {incorrectCount >= 5 ? (
                                        <p id='capital'>
                                            <strong>Capital city:</strong> {capital}
                                        </p>
                                    ) : (
                                        <>
                                            <p className='locked-icon'>🔒</p>
                                            <p>
                                                <strong>Capital city</strong>
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            {(incorrectCount >= 4 || incorrectCount === 3) && (
                                <div
                                    className={`clue-box ${incorrectCount >= 4 ? (incorrectCount === 4 ? 'latest-clue' : '') : 'locked'}`}
                                >
                                    {incorrectCount >= 4 ? (
                                        <>
                                            <p>
                                                <strong>Flag:</strong>
                                            </p>
                                            <img id='flag' src={flag} alt='Country Flag' className='clue-flag' />
                                        </>
                                    ) : (
                                        <>
                                            <p className='locked-icon'>🔒</p>
                                            <p>
                                                <strong>Flag</strong>
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            {(incorrectCount >= 3 || incorrectCount === 2) && (
                                <div
                                    className={`clue-box ${incorrectCount >= 3 ? (incorrectCount === 3 ? 'latest-clue' : '') : 'locked'}`}
                                >
                                    {incorrectCount >= 3 ? (
                                        <p id='subregion'>
                                            <strong>Sub region:</strong> {subregion}
                                        </p>
                                    ) : (
                                        <>
                                            <p className='locked-icon'>🔒</p>
                                            <p>
                                                <strong>Sub region</strong>
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            {(incorrectCount >= 2 || incorrectCount === 1) && (
                                <div
                                    className={`clue-box ${incorrectCount >= 2 ? (incorrectCount === 2 ? 'latest-clue' : '') : 'locked'}`}
                                >
                                    {incorrectCount >= 2 ? (
                                        <p id='landlocked'>
                                            <strong>Landlocked:</strong> {landlocked}
                                        </p>
                                    ) : (
                                        <>
                                            <p className='locked-icon'>🔒</p>
                                            <p>
                                                <strong>Landlocked</strong>
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            {(incorrectCount >= 1 || incorrectCount === 0) && (
                                <div
                                    className={`clue-box ${incorrectCount >= 1 ? (incorrectCount === 1 ? 'latest-clue' : '') : 'locked'}`}
                                >
                                    {incorrectCount >= 1 ? (
                                        <p id='region'>
                                            <strong>Region:</strong> {region}
                                        </p>
                                    ) : (
                                        <>
                                            <p className='locked-icon'>🔒</p>
                                            <p>
                                                <strong>Region</strong>
                                            </p>
                                        </>
                                    )}
                                </div>
                            )}
                            <div className={`clue-box ${incorrectCount === 0 ? 'latest-clue' : ''}`}>
                                <p id='population'>
                                    <strong>Population:</strong> {population}
                                </p>
                            </div>
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
                    onReset={onReset}
                />
            )}
            {failed && <CountryGuesserFailurePage name={name} flag={flag} guesses={guesses} onReset={onReset} />}
        </div>
    );
}

export default CountryGuesser;
