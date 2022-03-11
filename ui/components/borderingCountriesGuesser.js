import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function borderingCountriesGuesser(props) {
    // TODO will all these be used?
    const [guessAttempted, setGuessAttempted] = useState(false);
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState([]);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [guesses, setGuesses] = useState([]);
    const [duplicateGuess, setDuplicateGuess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [value, setValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setValue('');
        const guessedName = event.target[0].value.toLowerCase();

        if (guessedName.length > 0) {
            if (!guesses.includes(guessedName)) {
                setDuplicateGuess(false);
                setGuessAttempted(true);
                const lowerCaseCountryArray = props.borderingCountries.map(country => country.toLowerCase());
                if (lowerCaseCountryArray.includes(guessedName)) {
                    setCorrectGuesses([...correctGuesses, guessedName]);
                } else {
                    setIncorrectGuesses(guessedName);
                    setIncorrectCount(incorrectCount + 1);
                    setCorrectGuess(false);
                    if (incorrectCount === 5) {
                        setFailed(true);
                    }
                }
                setGuesses([...guesses, guessedName]);
            } else {
                setDuplicateGuess(true);
            }
        }
    };

    function changeValue(text) {
        setValue(text.value);
    }

    {/* TODO this needs an autocomplete form */ }
    return (
        <div id='borders'>
            <h2>Bordering Countries</h2>
            <div id='borders-form'>
                {<Form onSubmit={handleSubmit}>
                    <br />
                    <Form.Group className='mb-3'>
                        <Form.Label>Guess the bordering countries</Form.Label>
                        <Form.Control type='text' placeholder='' onChange={changeValue} value={value} />
                        <Form.Text className='text-muted'>
                            Enter a country name
                        </Form.Text>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>}
            </div>
            <p>Correct guesses so far: {correctGuesses.toString()}</p>
            <p>Incorrect guesses so far: {incorrectGuesses.toString()}</p>
            {/* TODO complete this */}
        </div>
    );
}

export default borderingCountriesGuesser;
