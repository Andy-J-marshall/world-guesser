import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import useStreakManager from '../../../hooks/useStreakManager';

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
    useStreakManager('borderStreak', 'reset');

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
