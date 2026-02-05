import StartNewGame from '../../../components/layout/StartNewGame';
import CountryGuesserStats from './CountryGuesserStats';

interface CountryGuesserFailurePageProps {
    name: string;
    flag: string;
    guesses: string[];
}

function CountryGuesserFailurePage(props: CountryGuesserFailurePageProps) {
    const name = props.name;
    const flag = props.flag;
    const guesses = props.guesses;

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfAttempts') || '0') || 0;
        const stats = {
            numberOfWins,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            streak: 0,
        };
        return stats;
    }

    return (
        <div id='country-guesser-failure-page' className='fade-in'>
            <div id='country-failure' className='game-container'>
                <h2 className='game-over-title'>Game Over</h2>
                <p className='error-message failure-message'>
                    You failed. Better luck next time!
                </p>
                <p className='failure-message'>The answer was {name}.</p>

                <div className='answer-history-container'>
                    <p className='answer-history-title'>
                        Your answer history:
                    </p>
                    <div className='answer-history-grid'>
                        {guesses.map((guess, index) => (
                            <span key={index} className='small-text answer-badge'>
                                {index + 1}. {guess}
                            </span>
                        ))}
                    </div>
                </div>

                <img
                    src={flag}
                    alt='Country Flag'
                    className='flag-image'
                />
            </div>
            <CountryGuesserStats updateStatsCallback={updateStats} />
            <div className='btn-container'>
                <StartNewGame buttonText='Try again' />
            </div>
        </div>
    );
}

export default CountryGuesserFailurePage;
