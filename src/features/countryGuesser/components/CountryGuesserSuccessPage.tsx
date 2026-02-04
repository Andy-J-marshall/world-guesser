import { useState } from 'react';
import BorderingCountriesGuesser from '../../borderingCountries/components/BorderingCountriesGuesser';
import Button from '../../../components/ui/Button';
import StartNewGame from '../../../components/layout/StartNewGame';
import CountryGuesserStats from './CountryGuesserStats';

interface CountryGuesserSuccessPageProps {
    countriesInfo: any;
    incorrectCount: number;
    guesses: string[];
    name: string;
    borderingCountries: string[];
    possibleCountries: string[];
    flag: string;
}

function CountryGuesserSuccessPage(props: CountryGuesserSuccessPageProps) {
    const countriesInfo = props.countriesInfo;
    const incorrectCount = props.incorrectCount;
    const guesses = props.guesses;
    const name = props.name;
    const borderingCountries = props.borderingCountries;
    const possibleCountries = props.possibleCountries;
    const flag = props.flag;

    const [newGameStarted, setNewGameStarted] = useState(false);
    const [borderingCountriesGameStarted, setBorderingCountriesGameStarted] = useState(false);

    function startBorderingCountriesGame() {
        setBorderingCountriesGameStarted(true);
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
        <>
            {!newGameStarted && (
                <div className='fade-in'>
                    <div id='successful-country-game' style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h2 className='success-title'>Success!</h2>
                        {incorrectCount === 0 && (
                            <h3
                                style={{
                                    color: 'var(--color-success)',
                                    marginBottom: 'var(--spacing-xl)',
                                }}
                            >
                                Amazing! You got {name} in one!
                            </h3>
                        )}
                        {incorrectCount > 0 && (
                            <h3
                                style={{
                                    color: 'var(--color-success)',
                                    marginBottom: 'var(--spacing-xl)',
                                }}
                            >
                                Well done! It took you {incorrectCount + 1} attempts to get {name}
                            </h3>
                        )}
                        {incorrectCount > 0 && (
                            <div
                                style={{
                                    background: 'rgba(129, 140, 248, 0.15)',
                                    borderRadius: 'var(--border-radius-lg)',
                                    padding: 'var(--spacing-lg)',
                                    marginBottom: 'var(--spacing-xl)',
                                    border: '1px solid rgba(129, 140, 248, 0.3)',
                                }}
                            >
                                <p
                                    style={{
                                        color: 'var(--color-text-primary)',
                                        marginBottom: 'var(--spacing-sm)',
                                        fontWeight: '600',
                                    }}
                                >
                                    Your answer history:
                                </p>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 'var(--spacing-sm)',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {guesses.map((guess, index) => (
                                        <span
                                            key={index}
                                            style={{
                                                background: 'rgba(30, 41, 59, 0.8)',
                                                padding: 'var(--spacing-xs) var(--spacing-md)',
                                                borderRadius: 'var(--border-radius-md)',
                                                color: 'var(--color-text-secondary)',
                                                border: '1px solid rgba(129, 140, 248, 0.2)',
                                                textTransform: 'capitalize',
                                            }}
                                        >
                                            {index + 1}. {guess}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        <img
                            src={flag}
                            alt='Country Flag'
                            style={{
                                maxWidth: '300px',
                                marginTop: 'var(--spacing-lg)',
                                display: 'block',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: 'var(--border-radius-lg)',
                            }}
                        />
                    </div>
                    {!newGameStarted && <CountryGuesserStats updateStatsCallback={updateStats} />}
                </div>
            )}

            {!newGameStarted && (
                <div className='btn-container'>
                    {!borderingCountriesGameStarted && <StartNewGame buttonText='Play again' />}
                    {borderingCountries.length > 0 && (
                        <Button callback={startBorderingCountriesGame} buttonText='Guess the bordering countries' />
                    )}
                </div>
            )}

            {newGameStarted && borderingCountriesGameStarted && (
                <BorderingCountriesGuesser
                    countriesInfo={countriesInfo}
                    name={name}
                    borderingCountries={borderingCountries}
                    possibleCountries={possibleCountries}
                />
            )}
        </>
    );
}

export default CountryGuesserSuccessPage;
