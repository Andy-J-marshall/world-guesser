import { useMemo } from 'react';
import BorderingCountriesGuesser from './BorderingCountriesGuesser';
import { useCountrySelection } from '../../../hooks/useCountrySelection';
import { CountriesInfo } from '../../../types';

interface BorderFinderModeProps {
    countriesInfo: CountriesInfo;
}

function BorderFinderMode({ countriesInfo }: BorderFinderModeProps) {
    const countryCodeMapping = countriesInfo.countryCodeMapping;

    const countriesWithBorders = useMemo(() => {
        return countriesInfo.responseBody.filter((country) => country.borders && country.borders.length > 0);
    }, [countriesInfo.responseBody]);

    const possibleCountries = useMemo(() => {
        return countriesWithBorders.map((country) => country.name.common);
    }, [countriesWithBorders]);

    const { country, resetGame, gameKey } = useCountrySelection(
        possibleCountries,
        countriesWithBorders,
        countryCodeMapping,
    );

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
