import { useState, useEffect } from 'react';
import BorderingCountriesFeedback from './BorderingCountriesFeedback';
import BorderingCountriesFailurePage from './BorderingCountriesFailurePage';
import BorderingCountriesSuccessPage from './BorderingCountriesSuccessPage';
import CountryForm from '../../../components/ui/CountryForm';
import BorderingCountriesClue from './BorderingCountriesClue';
import checkValidGuess from '../../../lib/countryValidation';
import { capitalizeText } from '../../../lib/utils';

interface BorderingCountriesGuesserProps {
    countriesInfo: any;
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    map: string;
}

function borderingCountriesGuesser(props: BorderingCountriesGuesserProps) {
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const map = props.map;

    const numberOfBorderingCountriesText =
        borderingCountries.length > 1
            ? `There are ${borderingCountries.length} bordering countries to find in total`
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
        const target = event.target as typeof event.target & {
            0: { value: string };
        };
        const guessedName = target[0].value.toLowerCase().trim();
        let { isValidCountry, knownCountry, duplicateGuess } = checkValidGuess(guessedName, possibleCountries, guesses);
        setCorrectLastGuess(false);
        if (guessedName === name.toLowerCase()) {
            setGuessedActualCountry(true);
            isValidCountry = false;
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
        if (incorrectCount >= 6) {
            setFailed(true);
        }

        const clues = findStartingLetterOfBorders();
        setClues(clues);
    });

    return (
        <div id='borders'>
            {!succeeded && !failed && (
                <div>
                    <h2>Bordering Countries</h2>
                    <p>Your country is: {name}</p>
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
                <div id='invalid-border-guess-feedback'>
                    <p
                        style={{
                            color: '#F66B0E',
                            fontSize: '0.9rem',
                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                            marginTop: 'var(--spacing-sm)',
                            marginBottom: 'var(--spacing-md)',
                            textAlign: 'center',
                        }}
                    >
                        That's the actual country! Guess the bordering ones instead
                    </p>
                </div>
            )}
            {!succeeded && !failed && clues && <BorderingCountriesClue clues={clues} />}
            {failed && !succeeded && (
                <BorderingCountriesFailurePage
                    name={name}
                    map={map}
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
                    map={map}
                    guesses={guesses}
                />
            )}
        </div>
    );
}

export default borderingCountriesGuesser;
