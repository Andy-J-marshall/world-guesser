import CountryGuesser from './CountryGuesser';
import { useCountrySelection } from '../../../hooks/useCountrySelection';
import { CountriesInfo } from '../../../types';

interface CountryGuesserModeProps {
    countriesInfo: CountriesInfo;
}

function CountryGuesserMode({ countriesInfo }: CountryGuesserModeProps) {
    const countryCodeMapping = countriesInfo.countryCodeMapping;
    const possibleCountries = countriesInfo.countriesArray;
    const allCountriesResponseBody = countriesInfo.responseBody;

    const { country, resetGame, gameKey } = useCountrySelection(
        possibleCountries,
        allCountriesResponseBody,
        countryCodeMapping,
    );

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
