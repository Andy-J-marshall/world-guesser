import { useState, useMemo } from 'react';
import CountryGuesser from './CountryGuesser';
import { selectCountry } from '../../../lib/countrySelection';
import { CountriesInfo } from '../../../types';
import { getRecentCountries, addRecentCountry } from '../../../lib/storageUtils';
import { STORAGE_KEYS } from '../../../constants/storageKeys';

interface CountryGuesserModeProps {
    countriesInfo: CountriesInfo;
}

function CountryGuesserMode({ countriesInfo }: CountryGuesserModeProps) {
    const [gameKey, setGameKey] = useState(0);
    const countryCodeMapping = countriesInfo.countryCodeMapping;
    const possibleCountries = countriesInfo.countriesArray;
    const allCountriesResponseBody = countriesInfo.responseBody;

    const country = useMemo(() => {
        const recentCountries = getRecentCountries(STORAGE_KEYS.COUNTRY_RECENT);
        const selected = selectCountry(
            possibleCountries,
            allCountriesResponseBody,
            countryCodeMapping,
            recentCountries,
        );
        addRecentCountry(STORAGE_KEYS.COUNTRY_RECENT, selected.name.toLowerCase());
        return selected;
    }, [gameKey, possibleCountries, allCountriesResponseBody, countryCodeMapping]);

    function resetGame() {
        setGameKey((prev) => prev + 1);
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

export default CountryGuesserMode;
