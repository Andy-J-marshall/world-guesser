import axios from 'axios';

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

    const country = selectCountry(countriesArray, body);

    const returnObject = {
      countriesArray: countriesArray.sort(),
      countryCodeMapping,
      country,
    }
    return returnObject;
  } catch (error) {
    console.log(error);
  }
}

function selectCountry(countriesArray, countriesResponse) {
  const selectedCountry = countriesArray[Math.floor(Math.random() * countriesArray.length)];
  const country = countriesResponse.find(country => country.name.common.toLowerCase() === selectedCountry.toLowerCase());
  const countryObj = {
    name: country.name.common,
    borders: country.borders,
    capital: country.capital,
    landlocked: country.landlocked,
    map: country.maps.googleMaps,
    population: country.population,
    flags: country.flags.png,
    region: country.region,
    subregion: country.subregion,
  };
  return countryObj;
}

export default allCountriesRequest;
