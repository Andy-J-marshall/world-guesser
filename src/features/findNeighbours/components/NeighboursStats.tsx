import GameStats from '../../../components/layout/GameStats';
import { NEIGHBOURS_KEYS } from '../../../constants/storageKeys';

function NeighboursStats() {
    return <GameStats title='Find Neighbours' storageKeys={NEIGHBOURS_KEYS} />;
}

export default NeighboursStats;
