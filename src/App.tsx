import { useState, useEffect } from 'react';
import Navigation, { ViewType } from './components/layout/Navigation';
import CountryGuesserMode from './features/countryGuesser/components/CountryGuesserMode';
import BorderFinderMode from './features/borderingCountries/components/BorderFinderMode';
import StatsView from './components/layout/StatsView';
import getAllCountriesRequest from './lib/countryApi';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

function App() {
    const [countriesData, setCountriesData] = useState<any>();
    const [foundCountry, setFoundCountry] = useState(false);
    const [activeView, setActiveView] = useState<ViewType>('country-guesser');

    useEffect(() => {
        if (!foundCountry) {
            getAllCountriesRequest().then((countriesData) => {
                setFoundCountry(true);
                setCountriesData(countriesData);
            });
        }
    }, [foundCountry]);

    const handleNavigate = (view: ViewType) => {
        setActiveView(view);
    };

    const renderView = () => {
        if (!countriesData && activeView !== 'stats') {
            return null;
        }

        switch (activeView) {
            case 'country-guesser':
                return <CountryGuesserMode countriesInfo={countriesData} />;
            case 'border-finder':
                return <BorderFinderMode countriesInfo={countriesData} />;
            case 'stats':
                return <StatsView />;
            default:
                return null;
        }
    };

    return (
        <div id='app'>
            <Navigation activeView={activeView} onNavigate={handleNavigate} />
            <div className='container'>{renderView()}</div>
        </div>
    );
}

export default App;
