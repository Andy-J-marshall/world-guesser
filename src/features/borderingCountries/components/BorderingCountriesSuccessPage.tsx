import StartNewGame from '../../../components/layout/StartNewGame';
import BorderingCountriesStats from './BorderingCountriesStats';

interface BorderingCountriesSuccessPageProps {
    incorrectGuesses: string[];
    correctGuesses: string[];
    guesses: string[];
}

function BorderingCountriesSuccessPage({
    incorrectGuesses,
    correctGuesses,
    guesses,
}: BorderingCountriesSuccessPageProps) {
    const incorrectCount = incorrectGuesses.length;
    const totalBorders = correctGuesses.length;

    const getSubtext = () => {
        if (incorrectCount === 0) return 'Flawless!';
        if (incorrectCount === 1) return '1 wrong guess';
        return `${incorrectCount} wrong guesses`;
    };

    function updateStats() {
        const numberOfWins = JSON.parse(localStorage.getItem('numberOfBorderWins') || '0') || 0;
        const numberOfGames = JSON.parse(localStorage.getItem('numberOfBorderGames') || '0') || 0;
        const numberOfAttempts = JSON.parse(localStorage.getItem('numberOfBorderAttempts') || '0') || 0;
        const numberOfCorrectAnswers = JSON.parse(localStorage.getItem('numberOfCorrectBorderAnswers') || '0') || 0;
        const numberOfIncorrectAnswers = JSON.parse(localStorage.getItem('numberOfIncorrectBorderAnswers') || '0') || 0;
        const streak = JSON.parse(localStorage.getItem('borderStreak') || '0') || 0;
        const stats = {
            numberOfWins: numberOfWins + 1,
            numberOfGames: numberOfGames + 1,
            numberOfAttempts: numberOfAttempts + guesses.length,
            numberOfCorrectAnswers: numberOfCorrectAnswers + correctGuesses.length,
            numberOfIncorrectAnswers: numberOfIncorrectAnswers + incorrectCount,
            streak: streak + 1,
        };
        return stats;
    }

    return (
        <div className='fade-in'>
            <div id='successful-bordering-countries-game' className='game-container success-page-container'>
                <div className='success-stat-hero'>
                    <div className='success-stat-number'>
                        {totalBorders}/{totalBorders} BORDERS
                    </div>
                    <div className='success-subtext'>{getSubtext()}</div>
                </div>
                <div className='btn-container'>
                    <StartNewGame buttonText='Play again' />
                </div>
                <div className='answer-history-container'>
                    <p className='answer-history-title'>Your answer history:</p>
                    <div className='answer-history-grid'>
                        {guesses.map((guess, index) => {
                            const isCorrect = correctGuesses.includes(guess);
                            const badgeClass = isCorrect ? 'correct-badge' : 'incorrect-badge';
                            return (
                                <span key={index} className={`small-text answer-badge ${badgeClass}`}>
                                    {index + 1}. {guess}
                                </span>
                            );
                        })}
                    </div>
                </div>
                <BorderingCountriesStats updateStatsCallback={updateStats} />
            </div>
        </div>
    );
}

export default BorderingCountriesSuccessPage;
