import StartNewGame from '../../../components/layout/StartNewGame';
import StreakDisplay from '../../../components/layout/StreakDisplay';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';
import CountryDisplay from '../../../components/layout/CountryDisplay';
import useStreakManager from '../../../hooks/useStreakManager';
import { STORAGE_KEYS } from '../../../constants/storageKeys';

interface BorderingCountriesSuccessPageProps {
    name: string;
    flag: string;
    correctGuesses: string[];
    guesses: string[];
    onReset: () => void;
}

function BorderingCountriesSuccessPage({
    name,
    flag,
    correctGuesses,
    guesses,
    onReset,
}: BorderingCountriesSuccessPageProps) {
    const totalBorders = correctGuesses.length;
    const streak = useStreakManager(STORAGE_KEYS.BORDER_STREAK, 'increment');

    return (
        <GameResultLayout
            id='successful-bordering-countries-game'
            heroContent={
                <>
                    <div className='success-stat-number'>
                        {totalBorders === 1 ? 'Border found!' : `All ${totalBorders} borders found!`}
                    </div>
                    <CountryDisplay name={name} flag={flag} />
                </>
            }
            actions={<StartNewGame buttonText='Play again' onReset={onReset} />}
        >
            <AnswerHistory guesses={guesses} correctGuesses={correctGuesses} />
            <StreakDisplay streak={streak} />
        </GameResultLayout>
    );
}

export default BorderingCountriesSuccessPage;
