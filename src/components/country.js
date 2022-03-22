import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CountryGuesser from './countryGuesser';
// import BorderingCountriesGuesser from './borderingCountriesGuesser'; // TODO remove?
import getAllCountriesRequest from '../restHelpers/allCountriesRequest';
import getCountryRequest from '../restHelpers/countryRequest';

function Country() {
  const [countryResponse, setCountryResponse] = useState();
  const [possibleCountries, setPossibleCountries] = useState();
  const [countryCodeMapping, setCountryCodeMapping] = useState();
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  // TODO refactor this!
  async function getCountry() {
    try {
      const getAllCountriesResp = await getCountriesInfo();
      const countryCode = returnRandomCountryCode(getAllCountriesResp);
      const response = await getCountryRequest(countryCode);
      setCountryResponse(response);
      setReady(true);
    } catch (error) {
      setError(true);
      console.log(error);
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
      console.log(error);
    }
  }

  function returnRandomCountryCode(getAllCountriesResp) {
    const countries = getAllCountriesResp.countriesArray;
    const selectedCountry = countries[Math.floor(Math.random() * countries.length)];
    const { countryCodeMapping } = getAllCountriesResp;
    setCountryCodeMapping(countryCodeMapping);
    const countryDetails = countryCodeMapping.find(country => country.name === selectedCountry);
    return countryDetails.code; // TODO just return countryDetails here instead and miss out the second API call?
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
        name={countryResponse.name}
        population={numberWithCommas(countryResponse.population)}
        flag={countryResponse.flags}
        landlocked={countryResponse.landlocked ? 'Yes' : 'No'}
        region={countryResponse.region}
        subregion={countryResponse.subregion}
        map={countryResponse.map}
        capital={countryResponse.capital.toString()}
        borderingCountries={countryResponse.borders}
        possibleCountries={possibleCountries}
        countryCodeMapping={countryCodeMapping}
      />}
      {/* {ready && countryResponse.borders && <BorderingCountriesGuesser
        name={countryResponse.name}
        borderingCountries={countryResponse.borders}
        possibleCountries={possibleCountries}
        countryCodeMapping={countryCodeMapping}
      />} */}
    </div >
  );
}

export default Country;
