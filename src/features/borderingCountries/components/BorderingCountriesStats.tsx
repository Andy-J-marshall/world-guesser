import GameStats from '../../../components/layout/GameStats';
import { BORDERING_COUNTRIES_KEYS } from '../../../constants/storageKeys';

function BorderingCountriesStats() {
    return <GameStats storageKeys={BORDERING_COUNTRIES_KEYS} />;
}

export default BorderingCountriesStats;
