import { useState, useEffect } from 'react';
import NeighboursFeedback from './NeighboursFeedback';
import NeighboursFailurePage from './NeighboursFailurePage';
import NeighboursSuccessPage from './NeighboursSuccessPage';
import CountryForm from '../../../components/ui/CountryForm';
import FeedbackToast from '../../../components/ui/FeedbackToast';
import checkValidGuess from '../../../lib/countryValidation';
import { parseFormGuess } from '../../../lib/formUtils';
import { capitalizeString } from '../../../lib/utils';
import { CountriesInfo } from '../../../types';
import { MAX_ATTEMPTS_FIND_NEIGHBOURS } from '../../../constants/game';

interface NeighboursGuesserProps {
    countriesInfo: CountriesInfo;
    name: string;
    flag: string;
    borderingCountries: string[];
    possibleCountries: string[];
    onReset: () => void;
}

function NeighboursGuesser({ name, flag, borderingCountries, possibleCountries, onReset }: NeighboursGuesserProps) {
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
            if (incorrectCount === MAX_ATTEMPTS_FIND_NEIGHBOURS - 1) {
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
        if (incorrectCount >= MAX_ATTEMPTS_FIND_NEIGHBOURS) {
            setFailed(true);
        }
    }, [incorrectCount, incorrectGuesses.length, correctGuesses]);

    const handleGiveUp = () => {
        const newIncorrectCount = MAX_ATTEMPTS_FIND_NEIGHBOURS;

        setIncorrectCount(newIncorrectCount);
        setFailed(true);
    };

    const possessiveName = `${name}'${name.endsWith('s') ? '' : 's'}`;

    return (
        <div id='find-neighbours' className='fade-in'>
            {!succeeded && !failed && (
                <>
                    <div id='borders-form'>
                        <h2>
                            Name {possessiveName} Neighbours{' '}
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
                                incorrectCount === MAX_ATTEMPTS_FIND_NEIGHBOURS - 1 && !finalAttemptWarningDismissed
                            }
                            onGiveUp={handleGiveUp}
                        />
                        {guesses.length > 0 && (
                            <NeighboursFeedback
                                guesses={guesses}
                                correctGuesses={correctGuesses}
                                incorrectCount={incorrectCount}
                            />
                        )}
                        <FeedbackToast
                            message={`${capitalizeString(lastIncorrectGuess)} doesn't border ${name}`}
                            show={showIncorrectToast}
                            type='error'
                        />
                    </div>
                </>
            )}
            {failed && !succeeded && (
                <NeighboursFailurePage
                    name={name}
                    flag={flag}
                    correctGuesses={correctGuesses}
                    borderingCountries={borderingCountries}
                    guesses={guesses}
                    onReset={onReset}
                />
            )}
            {succeeded && (
                <NeighboursSuccessPage
                    name={name}
                    flag={flag}
                    correctGuesses={correctGuesses}
                    guesses={guesses}
                    onReset={onReset}
                />
            )}
        </div>
    );
}

export default NeighboursGuesser;
