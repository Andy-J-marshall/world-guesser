import { useState, useMemo } from 'react';
import BorderingCountriesGuesser from './BorderingCountriesGuesser';
import { selectCountry } from '../../../lib/countrySelection';
import { CountriesInfo } from '../../../types';
import { getRecentCountries, addRecentCountry } from '../../../lib/storageUtils';
import { STORAGE_KEYS } from '../../../constants/storageKeys';

interface BorderFinderModeProps {
    countriesInfo: CountriesInfo;
}

function BorderFinderMode({ countriesInfo }: BorderFinderModeProps) {
    const [gameKey, setGameKey] = useState(0);
    const countryCodeMapping = countriesInfo.countryCodeMapping;

    const countriesWithBorders = useMemo(() => {
        return countriesInfo.responseBody.filter((country) => country.borders && country.borders.length > 0);
    }, [countriesInfo.responseBody]);

    const possibleCountries = useMemo(() => {
        return countriesWithBorders.map((country) => country.name.common);
    }, [countriesWithBorders]);

    const country = useMemo(() => {
        const recentCountries = getRecentCountries(STORAGE_KEYS.BORDER_RECENT);
        const selected = selectCountry(possibleCountries, countriesWithBorders, countryCodeMapping, recentCountries);
        addRecentCountry(STORAGE_KEYS.BORDER_RECENT, selected.name.toLowerCase());
        return selected;
    }, [gameKey, possibleCountries, countriesWithBorders, countryCodeMapping]);

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
