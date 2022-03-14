import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import CountryGuesser from './countryGuesser';
import BorderingCountriesGuesser from './borderingCountriesGuesser';

function Country() {
  const [countryResponse, setCountryResponse] = useState();
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);
  const [possibleCountries, setPossibleCountries] = useState();

  // TODO refactor this!
  async function getCountry() {
    try {
      // TODO give option for easy or hard mode e.g. fullCountriesArray or countryNames
      const fullCountriesArray = await getFullCountriesInfo();
      const countryList = fullCountriesArray.countryNames;
      const randomCountry = countryList[Math.floor(Math.random() * countryList.length)];
      const response = await axios.get('http://localhost:4000/country?country=' + randomCountry); // TODO will this always work? Try complex names
      setCountryResponse(response.data);
      // TODO what if it gets a 404?
      setReady(true);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  async function getFullCountriesInfo() {
    try {
      const response = await axios.get('http://localhost:4000/countries');
      const body = response.data;
      countryList(body.countryNames);
      return body;
    } catch (error) {
      console.log(error);
    }
  }

  function countryList(countriesArray) {
    const optionsList = [];
    // TODO organise in alphabetical order?
    countriesArray.forEach(country => {
      const option = {
        label: country,
      }
      optionsList.push(option);
    });
    setPossibleCountries(optionsList);
  }

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    // <div className='d-grid gap-2"></div>
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
