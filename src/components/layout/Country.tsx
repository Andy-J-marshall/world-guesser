import CountryGuesser from '../../features/countryGuesser/components/CountryGuesser';
import { selectCountry } from '../../lib/countrySelection';
import { CountryProps } from '../../types';

function Country({ countriesInfo }: CountryProps) {
    const countryCodeMapping = countriesInfo.countryCodeMapping;
    const possibleCountries = countriesInfo.countriesArray;
    const allCountriesResponseBody = countriesInfo.responseBody;
    const country = selectCountry(possibleCountries, allCountriesResponseBody, countryCodeMapping);

    return (
        <div id='country'>
            {country && (
                <CountryGuesser countriesInfo={countriesInfo} country={country} possibleCountries={possibleCountries} />
            )}
        </div>
    );
}

export default Country;
