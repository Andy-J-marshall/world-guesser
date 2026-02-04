import { useState, useEffect } from 'react';
import BorderingCountriesFeedback from './BorderingCountriesFeedback';
import BorderingCountriesFailurePage from './BorderingCountriesFailurePage';
import BorderingCountriesSuccessPage from './BorderingCountriesSuccessPage';
import CountryForm from '../../../components/ui/CountryForm';
import BorderingCountriesClue from './BorderingCountriesClue';
import ValidationErrors from '../../../components/validation/BasicValidation';
import checkValidGuess from '../../../lib/countryValidation';
import { parseFormGuess } from '../../../lib/formUtils';
import { capitalizeText } from '../../../lib/utils';
import { CountriesInfo } from '../../../types';
import { MAX_ATTEMPTS } from '../../../constants';

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
    const [correctLastGuess, setCorrectLastGuess] = useState(false);
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
        setValue(['']);

        const guessedName = parseFormGuess(event);
        let { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(guessedName, possibleCountries, guesses);

        setCorrectLastGuess(false);

        if (guessedName === name.toLowerCase()) {
            setGuessedActualCountry(true);
            return;
        } else {
            setGuessedActualCountry(false);
        }

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
            setCorrectLastGuess(true);
            if (correctGuesses.length + 1 === borderingCountries.length) {
                setSucceeded(true);
            }
        } else {
            setIncorrectGuesses([...incorrectGuesses, guessedName]);
            setIncorrectCount(incorrectCount + 1);
            setCorrectLastGuess(false);
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
        if (incorrectCount >= MAX_ATTEMPTS) {
            setFailed(true);
        }

        const clues = findStartingLetterOfBorders();
        setClues(clues);
    }, [incorrectCount, incorrectGuesses.length, correctGuesses]);

    return (
        <div id='borders'>
            {!succeeded && !failed && (
                <div>
                    <h2>{name}'s bordering Countries</h2>
                    <p>{numberOfBorderingCountriesText}</p>
                    <div id='borders-form'>
                        <CountryForm
                            possibleCountries={possibleCountries}
                            value={value}
                            setValue={setValue}
                            handleSubmit={handleSubmit}
                            duplicateGuess={duplicateGuess}
                            knownCountry={knownCountry}
                        />
                    </div>
                </div>
            )}
            {guesses.length > 0 && !failed && !succeeded && (
                <BorderingCountriesFeedback
                    correctGuesses={correctGuesses}
                    incorrectGuesses={incorrectGuesses}
                    incorrectCount={incorrectCount}
                    borderingCountriesCount={borderingCountries.length}
                />
            )}
            {!succeeded && !correctLastGuess && guessedActualCountry && (
                <ValidationErrors>
                    <p style={{ margin: 0 }}>That's the actual country! Guess the bordering ones instead</p>
                </ValidationErrors>
            )}
            {!succeeded && !failed && clues && <BorderingCountriesClue clues={clues} />}
            {failed && !succeeded && (
                <BorderingCountriesFailurePage
                    name={name}
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
