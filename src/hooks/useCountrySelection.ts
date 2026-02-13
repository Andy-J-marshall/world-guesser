import { useState, useMemo, useCallback } from 'react';
import { selectCountry } from '../lib/countrySelection';
import { getRecentCountries, addRecentCountry } from '../lib/storageUtils';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { Country, CountryCodeMapping } from '../types';

export function useCountrySelection(
    possibleCountries: string[],
    countriesResponse: Country[],
    countryCodeMapping: CountryCodeMapping[],
) {
    const [gameKey, setGameKey] = useState(0);

    const country = useMemo(() => {
        const recentCountries = getRecentCountries(STORAGE_KEYS.COUNTRY_RECENT);
        const selected = selectCountry(possibleCountries, countriesResponse, countryCodeMapping, recentCountries);
        addRecentCountry(STORAGE_KEYS.COUNTRY_RECENT, selected.name.toLowerCase());
        return selected;
    }, [gameKey, possibleCountries, countriesResponse, countryCodeMapping]);

    const resetGame = useCallback(() => {
        setGameKey((prev) => prev + 1);
    }, []);

    return { country, resetGame, gameKey };
}
