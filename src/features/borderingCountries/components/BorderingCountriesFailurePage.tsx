import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';

interface BorderingCountriesFailurePageProps {
    borderingCountries: string[];
    correctGuesses: string[];
    guesses: string[];
}

function BorderingCountriesFailurePage({
    borderingCountries,
    correctGuesses,
    guesses,
}: BorderingCountriesFailurePageProps) {
    const borderingCountriesCount = borderingCountries.length;

    useEffect(() => {
        try {
            localStorage.setItem('borderStreak', '0');
        } catch (error) {
            console.log('Unable to reset streak');
        }
    }, []);

    return (
        <GameResultLayout
            id='bordering-countries-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    {correctGuesses.length === 0 && (
                        <p className='failure-message'>No borders found. Keep trying!</p>
                    )}
                    {correctGuesses.length > 0 && (
                        <p className='failure-message'>
                            {correctGuesses.length} of {borderingCountriesCount} borders found.
                        </p>
                    )}
                </>
            }
            actions={<StartNewGame buttonText='Try again' />}
        >
            <AnswerHistory guesses={guesses} correctGuesses={correctGuesses} />
        </GameResultLayout>
    );
}

export default BorderingCountriesFailurePage;
