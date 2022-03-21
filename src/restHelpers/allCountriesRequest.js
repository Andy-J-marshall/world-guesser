import axios from 'axios';
import https from 'https';

// https://restcountries.com/

async function allCountriesRequest() {
  try {
    // TODO do I still have to do this?
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    const response = await axios.get(`https://restcountries.com/v3.1/all`, {
      httpsAgent: agent,
    });
    const body = response.data;

    const officialCountryNameArray = [];
    const countriesArray = [];
    const countryCodeMapping = [];
    const extraCountries = ['Taiwan', 'Greenland', 'Palestine', 'Kosovo', 'Western Sahara'];

    body.forEach(country => {
      const name = country.name.common;
      const officialName = country.name.official;
      officialCountryNameArray.push(officialName);
      if ((country.unMember && country.independent) || extraCountries.includes(name)) {
        countriesArray.push(name);
        let code = country.cioc;
        if (!code) {
          code = country.cca3;
        }
        const countryMappingObj = {
          name,
          code,
        };
        countryCodeMapping.push(countryMappingObj);
      }
    });

    const returnObject = {
      officialCountryNames: officialCountryNameArray.sort(),
      countriesArray: countriesArray.sort(),
      countryCodeMapping,
    }
    return returnObject;

  } catch (error) {
    console.log(error);
  }
}

export default allCountriesRequest;
