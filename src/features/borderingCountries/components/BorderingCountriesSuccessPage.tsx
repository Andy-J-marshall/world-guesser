import { useState, useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';

interface BorderingCountriesSuccessPageProps {
    name: string;
    flag: string;
    correctGuesses: string[];
    guesses: string[];
}

function BorderingCountriesSuccessPage({ name, flag, correctGuesses, guesses }: BorderingCountriesSuccessPageProps) {
    const totalBorders = correctGuesses.length;
    const [streak, setStreak] = useState(0);

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
        <GameResultLayout
            id='successful-bordering-countries-game'
            heroContent={
                <>
                    <div className='success-stat-number'>
                        {totalBorders === 1 ? 'Border found!' : `All ${totalBorders} borders found!`}
                    </div>
                    <div className='success-country-display'>
                        <img src={flag} className='success-flag' alt={`${name} flag`} />
                        <div className='success-country-name'>{name}</div>
                    </div>
                </>
            }
            actions={<StartNewGame buttonText='Play again' />}
        >
            <AnswerHistory guesses={guesses} correctGuesses={correctGuesses} />
            <StreakDisplay streak={streak} />
        </GameResultLayout>
    );
}

export default BorderingCountriesSuccessPage;
