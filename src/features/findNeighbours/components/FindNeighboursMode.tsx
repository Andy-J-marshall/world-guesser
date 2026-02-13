import { useMemo } from 'react';
import NeighboursGuesser from './NeighboursGuesser';
import { useCountrySelection } from '../../../hooks/useCountrySelection';
import { CountriesInfo } from '../../../types';

interface FindNeighboursModeProps {
    countriesInfo: CountriesInfo;
}

function FindNeighboursMode({ countriesInfo }: FindNeighboursModeProps) {
    const countryCodeMapping = countriesInfo.countryCodeMapping;

    const countriesWithBorders = useMemo(() => {
        const independentCountryNames = countriesInfo.countriesArray;
        return countriesInfo.responseBody.filter(
            (country) =>
                independentCountryNames.includes(country.name.common) && country.borders && country.borders.length > 0,
        );
    }, [countriesInfo.responseBody, countriesInfo.countriesArray]);

    const possibleCountries = useMemo(() => {
        return countriesWithBorders.map((country) => country.name.common).sort();
    }, [countriesWithBorders]);

    const { country, resetGame, gameKey } = useCountrySelection(
        possibleCountries,
        countriesWithBorders,
        countryCodeMapping,
    );

    return (
        <div id='find-neighbours-mode'>
            {country && (
                <NeighboursGuesser
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

export default FindNeighboursMode;
