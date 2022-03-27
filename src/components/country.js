import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CountryGuesser from './countryGuesser';
import BorderingCountriesGuesser from './borderingCountriesGuesser'; // TODO remove?
import getAllCountriesRequest from '../restHelpers/allCountriesRequest';

function Country() {
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

  return (
    <div id='country'>
      {!ready && <Button variant='primary' size='lg' onClick={getCountry}>
        Press to begin the fun!
      </Button>}
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
        borderingCountries={country.borders}
        possibleCountries={possibleCountries}
        countryCodeMapping={countryCodeMapping}
      />}
      {ready && country.borders && <BorderingCountriesGuesser
        name={country.name}
        borderingCountries={country.borders}
        possibleCountries={possibleCountries}
        countryCodeMapping={countryCodeMapping}
        map={country.map}
      />}
    </div >
  );
}

export default Country;
