import MysteryCountry from './MysteryCountry';
import { useCountrySelection } from '../../../hooks/useCountrySelection';
import { CountriesInfo } from '../../../types';

interface MysteryCountryModeProps {
    countriesInfo: CountriesInfo;
}

function MysteryCountryMode({ countriesInfo }: MysteryCountryModeProps) {
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
                <MysteryCountry
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

export default MysteryCountryMode;
