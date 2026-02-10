import GameStats from '../../../components/layout/GameStats';
import { COUNTRY_GUESSER_KEYS } from '../../../constants/storageKeys';

function CountryGuesserStats() {
    return <GameStats title='Country Guesser' storageKeys={COUNTRY_GUESSER_KEYS} />;
}

export default CountryGuesserStats;
