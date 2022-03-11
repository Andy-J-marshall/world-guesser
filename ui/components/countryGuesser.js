import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function CountryGuesser(props) {
    const [guessAttempted, setGuessAttempted] = useState(false);
    const [correctGuess, setCorrectGuess] = useState(false);
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
                if (guessedName === props.name.toLowerCase()) {
                    setCorrectGuess(true);
                } else {
                    setIncorrectCount(incorrectCount + 1)
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

    // TODO this is causing a warning in the console
    function changeValue(text) {
        setValue(text.value);
    }

    return (
        <div id='country-guesser' className='component'>
            {!failed && !correctGuess && <div id='country-info'>
                <h2>Mystery Country</h2>
                {<p>Population = {props.population}</p>}
                {incorrectCount >= 1 && <p>Region = {props.region}</p>}
                {incorrectCount >= 2 && <p>Landlocked = {props.landlocked}</p>}
                {incorrectCount >= 3 && <p>Sub region = {props.subregion}</p>}
                {incorrectCount >= 4 && <div>
                    <p>Flag: </p>
                    {<img style={{ border: 'solid' }} src={props.flag} alt='Country Flag' />}
                </div>}
                {incorrectCount >= 5 && <p>Capital city/cities = {props.capital}</p>}
            </div>}
            <div id='country-form'>
                {!correctGuess && !failed && <Form onSubmit={handleSubmit}>
                    <br />
                    <Form.Group className='mb-3'>
                        <Form.Label>Guess the country</Form.Label>
                        <Form.Control type='text' placeholder='' onChange={changeValue} value={value} />
                        <Form.Text className='text-muted'>
                            Enter a country name
                        </Form.Text>

                        {/* TODO this needs an autocomplete form */}
                        {/* https://www.javatpoint.com/html-list-box#:~:text=The%20list%20box%20is%20a,from%20the%20list%20of%20options. */}
                        {/* <Form.Select aria-label="Default select example">
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select> */}


                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>}
            </div>
            <br />
            {!correctGuess && guessAttempted && !failed && <div id='guess-feedback'>
                {duplicateGuess && <p style={{ color: 'brown' }}>You've already tried that country!</p>}
                {!duplicateGuess && <p style={{ color: 'red' }}>Incorrect! That was your {incorrectCount} attempt.</p>}
                {<p>Your guesses so far: {guesses.toString()}</p>}
            </div>}
            {correctGuess && !failed && <div id='successful-guess'>
                {incorrectCount === 0 && <h5>Amazing! You got <a href={props.map}>{props.name}</a> in 1!</h5>}
                {incorrectCount > 0 && <h5>Well done!! It took you {incorrectCount + 1} attempts to get <a href={props.map}>{props.name}</a>!</h5>}
                {<img style={{ border: 'solid' }} src={props.flag} alt='Country Flag' />}
                <p>Your answer history was: {guesses.toString()}</p>
            </div>}
            {failed && <div id='incorrect-guess'>
                <p style={{ color: 'red' }}>YOU LOST</p>
                {<p>The answer was <a href={props.map}>{props.name}</a></p>}
                {<img style={{ border: 'solid' }} src={props.flag} alt='Country Flag' />}
            </div>}
        </div >
    )
}

export default CountryGuesser;
