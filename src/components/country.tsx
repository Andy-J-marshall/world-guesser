import CountryGuesser from './countryGuesser/countryGuesser';
import { selectCountry } from '../helpers/countryHelper';
import { CountryProps } from '../types';

function Country(props: CountryProps) {
  const countriesInfo = props.countriesInfo;

  const countryCodeMapping = countriesInfo.countryCodeMapping
  const possibleCountries = countriesInfo.countriesArray;
  const allCountriesResponseBody = countriesInfo.responseBody;
  const country = selectCountry(possibleCountries, allCountriesResponseBody, countryCodeMapping);

  return (
    <div id='country'>
      {country && <CountryGuesser
        countriesInfo={countriesInfo}
        country={country}
        possibleCountries={possibleCountries}
      />}
    </div >
  );
}

export default Country;
