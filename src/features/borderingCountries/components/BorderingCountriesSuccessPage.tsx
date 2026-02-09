import { useState, useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';

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
    const [streak, setStreak] = useState(0);

    const getSubtext = () => {
        if (incorrectCount === 0) return 'Flawless!';
        if (incorrectCount === 1) return '1 wrong guess';
        return `${incorrectCount} wrong guesses`;
    };

    useEffect(() => {
        const currentStreak = JSON.parse(localStorage.getItem('borderStreak') || '0') || 0;
        setStreak(currentStreak + 1);

        try {
            localStorage.setItem('borderStreak', JSON.stringify(currentStreak + 1));
        } catch (error) {
            console.log('Unable to update streak');
        }
    }, []);

    return (
        <div className='fade-in'>
            <div id='successful-bordering-countries-game' className='game-container success-page-container'>
                <div className='success-stat-hero'>
                    <div className='success-celebration'>{getSubtext()}</div>
                    <div className='success-stat-number'>
                        {totalBorders}/{totalBorders} BORDERS
                    </div>
                </div>
                <div className='btn-container'>
                    <StartNewGame buttonText='Play again' />
                </div>
                <StreakDisplay streak={streak} />
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
            </div>
        </div>
    );
}

export default BorderingCountriesSuccessPage;
