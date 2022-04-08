import React from 'react';
import CountryGuesser from './countryGuesser';
import { selectCountry } from '../helpers/allCountriesRequest';

function Country(props) {
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
