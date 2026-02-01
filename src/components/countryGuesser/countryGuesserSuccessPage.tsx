import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BorderingCountriesGuesser from '../borderingCountries/borderingCountriesGuesser';
import Button from '../button';
import StartNewGame from '../startNewGame';
import CountryGuesserStats from '../countryGuesser/countryGuesserStats';
import { capitalizeText } from '../../helpers/utils';

interface CountryGuesserSuccessPageProps {
    countriesInfo: any;
    incorrectCount: number;
    guesses: string[];
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    flag: string;
    map: string;
}

function CountryGuesserSuccessPage(props: CountryGuesserSuccessPageProps) {
    const countriesInfo = props.countriesInfo;
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const flag = props.flag;
    const map = props.map;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [borderingCountriesGameStarted, setBorderingCountriesGameStarted] = useState(false);

    function startBorderingCountriesGame() {
        setBorderingCountriesGameStarted(true);
        setNewGameStarted(true);
    }

    async function startNewGame() {
        setNewGameStarted(true);
    }

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || '0') || 0;
        const streak = JSON.parse(localStorage.getItem('streak') || '0') || 0;
        const stats = {
            numberOfWins: numberOfWins + 1,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            streak: streak + 1,
        };
        return stats;
    }

    return (
        <div>
            {!newGameStarted && < div id='successful-country-game' >
                {incorrectCount === 0 && <h5 style={{ color: '#F66B0E' }}>Amazing! You got <a href={map}>{name}</a> in one!</h5>}
                {incorrectCount > 0 && <h5 style={{ color: '#F66B0E' }}>Well done! It took you {incorrectCount + 1} attempts to get <a href={map}>{name}</a></h5>}
                {incorrectCount > 0 && <p>Your answer history was: {capitalizeText(guesses)}</p>}
                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
            </div >}
            {!newGameStarted && <br />}
            {!newGameStarted && <CountryGuesserStats
                updateStatsCallback={updateStats}
                country={name}
                numberOfGuesses={guesses.length}
                succeeded={true}
            />}

            <Container>
                <Row>
                    <Col xs lg='2'></Col>
                    <Col>
                        {!borderingCountriesGameStarted && <StartNewGame
                            countriesInfo={countriesInfo}
                            buttonText='Play again'
                            callback={startNewGame}
                        />}
                    </Col>
                    {borderingCountries.length > 0 &&
                        <Col>
                            {!newGameStarted && <Button
                                callback={startBorderingCountriesGame}
                                buttonText='Guess the bordering countries'
                            />}
                        </Col>
                    }
                    <Col xs lg='2'></Col>
                </Row>
            </Container>
            {newGameStarted && borderingCountriesGameStarted && <BorderingCountriesGuesser
                countriesInfo={countriesInfo}
                name={name}
                borderingCountries={borderingCountries}
                possibleCountries={possibleCountries}
                map={map}
            />}
        </div>
    )
}

export default CountryGuesserSuccessPage;
