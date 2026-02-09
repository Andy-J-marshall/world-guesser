import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';

interface CountryGuesserFailurePageProps {
    name: string;
    flag: string;
    guesses: string[];
}

function CountryGuesserFailurePage(props: CountryGuesserFailurePageProps) {
    const name = props.name;
    const flag = props.flag;
    const guesses = props.guesses;

    useEffect(() => {
        try {
            localStorage.setItem('streak', '0');
        } catch (error) {
            console.log('Unable to reset streak');
        }
    }, []);

    return (
        <div id='country-guesser-failure-page' className='fade-in'>
            <div id='country-failure' className='game-container success-page-container'>
                <div className='success-stat-hero'>
                    <div className='success-celebration'>Not quite!</div>
                    <div className='success-country-display'>
                        <img src={flag} className='success-flag' alt={`${name} flag`} />
                        <div className='success-country-name'>{name}</div>
                    </div>
                </div>
                <div className='btn-container'>
                    <StartNewGame buttonText='Try again' />
                </div>
                <div className='answer-history-container'>
                    <p className='answer-history-title'>Your guesses:</p>
                    <div className='answer-history-grid'>
                        {guesses.map((guess, index) => (
                            <span key={index} className='answer-badge'>
                                {guess}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CountryGuesserFailurePage;
