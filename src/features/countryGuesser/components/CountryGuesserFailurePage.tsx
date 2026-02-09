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
            <div id='country-failure' className='game-container'>
                <h2 className='game-over-title'>Game Over</h2>
                <p className='error-message failure-message'>You failed. Better luck next time!</p>
                <p className='failure-message'>The answer was {name}.</p>

                <div className='answer-history-container'>
                    <p className='answer-history-title'>Your answer history:</p>
                    <div className='answer-history-grid'>
                        {guesses.map((guess, index) => (
                            <span key={index} className='small-text answer-badge'>
                                {index + 1}. {guess}
                            </span>
                        ))}
                    </div>
                </div>

                <img src={flag} alt='Country Flag' className='flag-image' />
            </div>
            <div className='btn-container'>
                <StartNewGame buttonText='Try again' />
            </div>
        </div>
    );
}

export default CountryGuesserFailurePage;
