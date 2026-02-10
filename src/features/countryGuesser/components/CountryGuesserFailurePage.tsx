import { useEffect } from 'react';
import StartNewGame from '../../../components/layout/StartNewGame';
import AnswerHistory from '../../../components/layout/AnswerHistory';
import GameResultLayout from '../../../components/layout/GameResultLayout';

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
        <GameResultLayout
            id='country-failure'
            heroContent={
                <>
                    <div className='success-celebration'>Not quite!</div>
                    <div className='success-country-display'>
                        <img src={flag} className='success-flag' alt={`${name} flag`} />
                        <div className='success-country-name'>{name}</div>
                    </div>
                </>
            }
            actions={<StartNewGame buttonText='Try again' />}
        >
            <AnswerHistory guesses={guesses} />
        </GameResultLayout>
    );
}

export default CountryGuesserFailurePage;
