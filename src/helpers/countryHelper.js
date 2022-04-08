import axios from 'axios';
import { capitalizeText, numberWithCommas } from './utils';

// https://restcountries.com/

async function allCountriesRequest() {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/all`);
    const body = response.data;

    const countriesArray = [];
    const countryCodeMapping = [];
    const extraCountries = ['Taiwan', 'Greenland', 'Palestine', 'Kosovo', 'Western Sahara'];

    body.forEach(country => {
      const name = country.name.common;
      if ((country.unMember && country.independent) || extraCountries.includes(name)) {
        countriesArray.push(name);
        const code = country.cca3;
        const countryMappingObj = {
          name,
          code,
        };
        countryCodeMapping.push(countryMappingObj);
      }
    });

    const returnObject = {
      countriesArray: countriesArray.sort(),
      countryCodeMapping,
      responseBody: body,
    }
    return returnObject;
  } catch (error) {
    console.log(error);
  }
}

export function selectCountry(countriesArray, countriesResponse, countryCodeMapping) {
  const selectedCountry = countriesArray[Math.floor(Math.random() * countriesArray.length)];
  const country = countriesResponse.find(country => country.name.common.toLowerCase() === selectedCountry.toLowerCase());
  const countryObj = {
    name: country.name.common,
    borderingCountries: returnBorderingCountries(country.borders, countryCodeMapping),
    capital: capitalizeText(country.capital),
    landlocked: country.landlocked ? 'The country is landlocked' : 'The country has a coastline',
    map: country.maps.googleMaps,
    population: numberWithCommas(country.population),
    flag: country.flags.png,
    region: country.region,
    subregion: country.subregion,
  };
  return countryObj;
}


function returnBorderingCountries(borderingCountries, countryCodeMapping) {
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

export default allCountriesRequest;
