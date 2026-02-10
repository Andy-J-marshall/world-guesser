import CountryGuesserStats from '../../features/countryGuesser/components/CountryGuesserStats';
import BorderingCountriesStats from '../../features/borderingCountries/components/BorderingCountriesStats';

function StatsView() {
    return (
        <div id='stats-view' className='fade-in'>
            <h2>Your Statistics</h2>
            <div className='stats-view-content'>
                <CountryGuesserStats />
                <BorderingCountriesStats />
            </div>
        </div>
    );
}

export default StatsView;
