import React from 'react';
import CountryGuesser from './countryGuesser';
import { capitalizeText, numberWithCommas } from '../helpers/utils';
import { selectCountry } from '../helpers/allCountriesRequest';

function Country(props) {
  const countriesInfo = props.countriesInfo;

  const countryCodeMapping = countriesInfo.countryCodeMapping
  const possibleCountries = countriesInfo.countriesArray;
  const country = selectCountry(possibleCountries, countriesInfo.responseBody);

  function returnBorderingCountries(borderingCountries) {
    const answerCountries = [];
    if (borderingCountries) {
      borderingCountries.forEach(borderingCountry => {
        countryCodeMapping.find(country => {
          if (country.code === borderingCountry) {
            answerCountries.push(country.name);
          }
        })
      });
    }
    return answerCountries;
  }

  return (
    // TODO don't have to pass everything in for country., just countries info?
    <div id='country'>
      {country && <CountryGuesser
        countriesInfo={countriesInfo}
        name={country.name}
        population={numberWithCommas(country.population)}
        flag={country.flags}
        landlocked={country.landlocked ? 'The country is landlocked' : 'The country is not landlocked'}
        region={country.region}
        subregion={country.subregion}
        map={country.map}
        capital={capitalizeText(country.capital)}
        borderingCountries={returnBorderingCountries(country.borders)}
        possibleCountries={possibleCountries}
      />}
    </div >
  );
}

export default Country;
