import { useState, useEffect } from 'react';
import BorderingCountriesFeedback from './BorderingCountriesFeedback';
import BorderingCountriesFailurePage from './BorderingCountriesFailurePage';
import BorderingCountriesSuccessPage from './BorderingCountriesSuccessPage';
import CountryForm from '../../../components/ui/CountryForm';
import FeedbackToast from '../../../components/ui/FeedbackToast';
import checkValidGuess from '../../../lib/countryValidation';
import { parseFormGuess } from '../../../lib/formUtils';
import { CountriesInfo } from '../../../types';
import { MAX_ATTEMPTS_BORDERING_COUNTRIES } from '../../../constants';

interface BorderingCountriesGuesserProps {
    countriesInfo: CountriesInfo;
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
}

function BorderingCountriesGuesser({ name, borderingCountries, possibleCountries }: BorderingCountriesGuesserProps) {
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
    const [showIncorrectToast, setShowIncorrectToast] = useState(false);
    const [lastIncorrectGuess, setLastIncorrectGuess] = useState('');
    const [finalAttemptWarningDismissed, setFinalAttemptWarningDismissed] = useState(false);

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
            if (incorrectCount === MAX_ATTEMPTS_BORDERING_COUNTRIES - 1) {
                setFinalAttemptWarningDismissed(true);
            }
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
            setLastIncorrectGuess(guessedName);
            setShowIncorrectToast(true);
        }
        setGuesses([...guesses, guessedName]);
    }

    useEffect(() => {
        if (incorrectCount >= MAX_ATTEMPTS_BORDERING_COUNTRIES) {
            setFailed(true);
        }
    }, [incorrectCount, incorrectGuesses.length, correctGuesses]);

    return (
        <div id='borders' className='fade-in'>
            {!succeeded && !failed && (
                <>
                    <div id='borders-form'>
                        <h2>
                            Find {name}'s borders{' '}
                            <span className='progress-count'>
                                ({correctGuesses.length}/{borderingCountries.length})
                            </span>
                        </h2>
                        <CountryForm
                            possibleCountries={possibleCountries}
                            value={value}
                            setValue={setValue}
                            handleSubmit={handleSubmit}
                            duplicateGuess={duplicateGuess}
                            knownCountry={knownCountry}
                            actualCountry={guessedActualCountry}
                            isLastAttempt={
                                incorrectCount === MAX_ATTEMPTS_BORDERING_COUNTRIES - 1 && !finalAttemptWarningDismissed
                            }
                        />
                        {guesses.length > 0 && (
                            <BorderingCountriesFeedback
                                correctGuesses={correctGuesses}
                                incorrectCount={incorrectCount}
                            />
                        )}
                        <FeedbackToast
                            message={`Incorrect! ${lastIncorrectGuess.charAt(0).toUpperCase() + lastIncorrectGuess.slice(1)} doesn't border ${name}`}
                            show={showIncorrectToast}
                            type='error'
                        />
                    </div>
                </>
            )}
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
