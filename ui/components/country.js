import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CountryGuesser from './countryGuesser';
import BorderingCountriesGuesser from './borderingCountriesGuesser';

function Country() {
  const [countryResponse, setCountryResponse] = useState();
  const [possibleCountries, setPossibleCountries] = useState();
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  // TODO refactor this!
  async function getCountry() {
    try {
      const getAllCountriesResp = await getCountriesInfo();
      const countryCode = returnRandomCountryCode(getAllCountriesResp);
      const response = await axios.get('http://localhost:4000/country?countryCode=' + countryCode); // TODO will this always work? Try complex names
      setCountryResponse(response.data);
      setReady(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  async function getCountriesInfo() {
    try {
      const response = await axios.get('http://localhost:4000/countries');
      const body = response.data;
      const countriesArray = body.countriesArray;
      const optionsList = [];
      countriesArray.forEach(country => {
        const option = {
          label: country,
        }
        optionsList.push(option);
      });
      setPossibleCountries(optionsList);
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  function returnRandomCountryCode(getAllCountriesResp) {
    const countries = getAllCountriesResp.countriesArray;
    const selectedCountry = countries[Math.floor(Math.random() * countries.length)];
    const { countryCodeMapping } = getAllCountriesResp;
    const countryDetails = countryCodeMapping.find(country => country.name === selectedCountry);
    return countryDetails.code;
  }

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div id='country'>
      {!ready && <Button variant='primary' size='lg' onClick={getCountry}>
        Press to begin the fun!
      </Button>}
      {/* TODO make the error handling more generic? Create a component */}
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
        possibleCountries={possibleCountries}
      />}
      {/* TODO should only show this when the other has been done? */}
      {/* TODO need to tidy up the borders */}
      {/* {ready && countryResponse.borders && <BorderingCountriesGuesser
        name={countryResponse.name} 
        borderingCountries={countryResponse.borders}
        possibleCountries={possibleCountries}
      />} */}
      {/* TODO once both completed clear the forms and show the button again? Or link to another page? */}
    </div >
  );
}

export default Country;
