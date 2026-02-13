import GameStats from '../../../components/layout/GameStats';
import { MYSTERY_COUNTRY_KEYS } from '../../../constants/storageKeys';

function MysteryCountryStats() {
    return <GameStats title='Mystery Country' storageKeys={MYSTERY_COUNTRY_KEYS} />;
}

export default MysteryCountryStats;
