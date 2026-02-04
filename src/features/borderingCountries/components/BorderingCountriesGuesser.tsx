import { useState, useEffect } from 'react';
import BorderingCountriesFeedback from './BorderingCountriesFeedback';
import BorderingCountriesFailurePage from './BorderingCountriesFailurePage';
import BorderingCountriesSuccessPage from './BorderingCountriesSuccessPage';
import CountryForm from '../../../components/ui/CountryForm';
import BorderingCountriesClue from './BorderingCountriesClue';
import checkValidGuess from '../../../lib/countryValidation';
import { parseFormGuess } from '../../../lib/formUtils';
import { capitalizeText } from '../../../lib/utils';
import { CountriesInfo } from '../../../types';
import { MAX_ATTEMPTS_BORDERING_COUNTRIES } from '../../../constants';

interface BorderingCountriesGuesserProps {
    countriesInfo: CountriesInfo;
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
}

function BorderingCountriesGuesser({ name, borderingCountries, possibleCountries }: BorderingCountriesGuesserProps) {
    const numberOfBorderingCountriesText =
        borderingCountries.length > 1
            ? `There are ${borderingCountries.length} bordering countries to find`
            : 'There is 1 bordering country to find';

    const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState<string[]>([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState<string[]>([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const [knownCountry, setKnownCountry] = useState(true);
    const [value, setValue] = useState<string[]>([]);
    const [guessedActualCountry, setGuessedActualCountry] = useState(false);
    const [clues, setClues] = useState<string>();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const guessedName = parseFormGuess(event);

        if (guessedName === name.toLowerCase()) {
            setGuessedActualCountry(true);
            setValue(['']);
            return;
        } else {
            setGuessedActualCountry(false);
        }

        setValue(['']);

        let { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(guessedName, possibleCountries, guesses);

        setKnownCountry(knownCountry);
        setDuplicateGuess(duplicateGuess);

        if (isValidCountry && knownCountry && !duplicateGuess) {
            checkGuessIsCorrect(guessedName);
        }
    };

    function checkGuessIsCorrect(guessedName: string) {
        const lowerCaseBorderingCountryArray = borderingCountries.map((country: string) => country.toLowerCase());
        if (lowerCaseBorderingCountryArray.includes(guessedName)) {
            setCorrectGuesses([...correctGuesses, guessedName]);
            if (correctGuesses.length + 1 === borderingCountries.length) {
                setSucceeded(true);
            }
        } else {
            setIncorrectGuesses([...incorrectGuesses, guessedName]);
            setIncorrectCount(incorrectCount + 1);
        }
        setGuesses([...guesses, guessedName]);
    }

    function findStartingLetterOfBorders() {
        if (incorrectGuesses.length >= 4) {
            const startingLetters: string[] = [];
            borderingCountries.forEach((country: string) => {
                if (!correctGuesses.includes(country.toLowerCase())) {
                    const letter = country.charAt(0).toUpperCase();
                    startingLetters.push(letter);
                }
            });
            return capitalizeText(startingLetters);
        }
    }

    useEffect(() => {
        if (incorrectCount >= MAX_ATTEMPTS_BORDERING_COUNTRIES) {
            setFailed(true);
        }

        const clues = findStartingLetterOfBorders();
        setClues(clues);
    }, [incorrectCount, incorrectGuesses.length, correctGuesses]);

    return (
        <div id='borders' className='fade-in'>
            {!succeeded && !failed && (
                <>
                    <div id='borders-form'>
                        <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>{name}'s bordering Countries</h2>
                        <p style={{ marginBottom: 'var(--spacing-lg)' }}>{numberOfBorderingCountriesText}</p>
                        <CountryForm
                            possibleCountries={possibleCountries}
                            value={value}
                            setValue={setValue}
                            handleSubmit={handleSubmit}
                            duplicateGuess={duplicateGuess}
                            knownCountry={knownCountry}
                            actualCountry={guessedActualCountry}
                        />
                        {guesses.length > 0 && (
                            <BorderingCountriesFeedback
                                correctGuesses={correctGuesses}
                                incorrectGuesses={incorrectGuesses}
                                incorrectCount={incorrectCount}
                                borderingCountriesCount={borderingCountries.length}
                            />
                        )}
                    </div>
                </>
            )}
            {!succeeded && !failed && clues && <BorderingCountriesClue clues={clues} />}
            {failed && !succeeded && (
                <BorderingCountriesFailurePage
                    correctGuesses={correctGuesses}
                    borderingCountries={borderingCountries}
                    guesses={guesses}
                />
            )}
            {succeeded && (
                <BorderingCountriesSuccessPage
                    correctGuesses={correctGuesses}
                    incorrectGuesses={incorrectGuesses}
                    name={name}
                    guesses={guesses}
                />
            )}
        </div>
    );
}

export default BorderingCountriesGuesser;
