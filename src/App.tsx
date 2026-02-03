import { useState, useEffect } from 'react';
import Country from './components/layout/Country';
import getAllCountriesRequest from './lib/countryApi';
import './app.css';

function App() {
    const [countriesData, setCountriesData] = useState<any>();
    const [foundCountry, setFoundCountry] = useState(false);

    useEffect(() => {
        if (!foundCountry) {
            getAllCountriesRequest().then((countriesData) => {
                setFoundCountry(true);
                setCountriesData(countriesData);
            });
        }
    }, [foundCountry]);

    return (
        <div id='app'>
            <div id='header'>
                <h1 style={{ fontSize: '4rem' }}>Fun With Countries</h1>
            </div>
            {countriesData && <Country countriesInfo={countriesData} />}
            <link
                rel='stylesheet'
                href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
                integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
                crossOrigin='anonymous'
            />
        </div>
    );
}

export default App;
