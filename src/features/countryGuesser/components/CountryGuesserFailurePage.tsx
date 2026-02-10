import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';

interface CountryGuesserFailurePageProps {
    name: string;
    flag: string;
    guesses: string[];
}

function CountryGuesserFailurePage({ name, flag, guesses }: CountryGuesserFailurePageProps) {
    useStreakManager('streak', 'reset');

    return (
        <GameResultLayout
            id='country-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Try again' />}
        >
            <AnswerHistory guesses={guesses} />
        </GameResultLayout>
    );
}

export default CountryGuesserFailurePage;
