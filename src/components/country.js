import React from 'react';
import CountryGuesser from './countryGuesser';

function Country(props) {
  const countriesInfo = props.countriesInfo;

  const countryCodeMapping = countriesInfo.countryCodeMapping
  const possibleCountries = countriesInfo.countriesArray;
  const country = countriesInfo.country;

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
    <div id='country'>
      {country && <CountryGuesser
        name={country.name}
        population={numberWithCommas(country.population)}
        flag={country.flags}
        landlocked={country.landlocked ? 'Country is landlocked' : 'Country is not landlocked'}
        region={country.region}
        subregion={country.subregion}
        map={country.map}
        capital={country.capital.toString()}
        borderingCountries={returnBorderingCountries(country.borders)}
        possibleCountries={possibleCountries}
      />}
    </div >
  );
}

export default Country;
