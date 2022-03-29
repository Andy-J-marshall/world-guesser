import React, { useState } from 'react';
import CountryGuesser from './countryGuesser';
import PlayButton from './playButton';
import getAllCountriesRequest from '../restHelpers/allCountriesRequest';

function Country(props) {

  const [country, setCountry] = useState();
  const [possibleCountries, setPossibleCountries] = useState();
  const [countryCodeMapping, setCountryCodeMapping] = useState();
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  async function getCountry() {
    try {
      const getAllCountriesResp = await getCountriesInfo();
      setCountryCodeMapping(getAllCountriesResp.countryCodeMapping);
      const country = getAllCountriesResp.country;
      console.log(country.name) // TODO remove this!
      setCountry(country);
      setReady(true);
    } catch (error) {
      setError(true);
    }
  }

  async function getCountriesInfo() {
    try {
      const response = await getAllCountriesRequest();
      const countriesArray = response.countriesArray;
      const optionsList = [];
      countriesArray.forEach(country => {
        const option = {
          label: country,
        }
        optionsList.push(option);
      });
      setPossibleCountries(optionsList);
      return response;
    } catch (error) {
      setError(true);
    }
  }

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
      {!ready && <PlayButton
        buttonText='Press to begin the fun!'
        callback={getCountry}
      />}
      {error && <p>Error found when finding country. Please try again</p>}
      {ready && <CountryGuesser
        name={country.name}
        population={numberWithCommas(country.population)}
        flag={country.flags}
        landlocked={country.landlocked ? 'Yes' : 'No'}
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
