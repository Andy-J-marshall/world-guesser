import MysteryCountryStats from '../../features/mysteryCountry/components/MysteryCountryStats';
import NeighboursStats from '../../features/findNeighbours/components/NeighboursStats';

function StatsView() {
    return (
        <div id='stats-view' className='fade-in'>
            <h2>Your Stats</h2>
            <div className='stats-view-content'>
                <MysteryCountryStats />
                <NeighboursStats />
            </div>
        </div>
    );
}

export default StatsView;
