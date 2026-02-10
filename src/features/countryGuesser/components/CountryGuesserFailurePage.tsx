import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';

interface CountryGuesserFailurePageProps {
    name: string;
    flag: string;
    guesses: string[];
    onReset: () => void;
}

function CountryGuesserFailurePage({ name, flag, guesses, onReset }: CountryGuesserFailurePageProps) {
    useStreakManager(STORAGE_KEYS.COUNTRY_STREAK, 'reset');

    return (
        <GameResultLayout
            id='country-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Try again' onReset={onReset} />}
        >
            <AnswerHistory guesses={guesses} />
        </GameResultLayout>
    );
}

export default CountryGuesserFailurePage;
