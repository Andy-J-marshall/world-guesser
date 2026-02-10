import { useState, useMemo } from 'react';
import BorderingCountriesGuesser from './BorderingCountriesGuesser';
import { selectCountry } from '../../../lib/countrySelection';
import { CountriesInfo } from '../../../types';

interface BorderFinderModeProps {
    countriesInfo: CountriesInfo;
}

function BorderFinderMode({ countriesInfo }: BorderFinderModeProps) {
    const [gameKey, setGameKey] = useState(0);
    const countryCodeMapping = countriesInfo.countryCodeMapping;
    const possibleCountries = countriesInfo.countriesArray;
    const allCountriesResponseBody = countriesInfo.responseBody;

    const country = useMemo(
        () => selectCountry(possibleCountries, allCountriesResponseBody, countryCodeMapping),
        [gameKey, possibleCountries, allCountriesResponseBody, countryCodeMapping],
    );

    function resetGame() {
        setGameKey((prev) => prev + 1);
    }

    return (
        <div id='borders-mode'>
            {country && (
                <BorderingCountriesGuesser
                    key={gameKey}
                    countriesInfo={countriesInfo}
                    name={country.name}
                    flag={country.flag}
                    borderingCountries={country.borderingCountries}
                    possibleCountries={possibleCountries}
                    onReset={resetGame}
                />
            )}
        </div>
    );
}

export default BorderFinderMode;
