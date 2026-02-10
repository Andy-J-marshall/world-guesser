import { useState } from 'react';
import CountryGuesser from '../../features/countryGuesser/components/CountryGuesser';
import { selectCountry } from '../../lib/countrySelection';
import { CountryProps } from '../../types';

function Country({ countriesInfo }: CountryProps) {
    const [gameKey, setGameKey] = useState(0);
    const countryCodeMapping = countriesInfo.countryCodeMapping;
    const possibleCountries = countriesInfo.countriesArray;
    const allCountriesResponseBody = countriesInfo.responseBody;
    const country = selectCountry(possibleCountries, allCountriesResponseBody, countryCodeMapping);

    function resetGame() {
        setGameKey(prev => prev + 1);
    }

    return (
        <div id='country'>
            {country && (
                <CountryGuesser
                    key={gameKey}
                    countriesInfo={countriesInfo}
                    country={country}
                    possibleCountries={possibleCountries}
                    onReset={resetGame}
                />
            )}
        </div>
    );
}

export default Country;
