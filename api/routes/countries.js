const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const https = require('https');

// https://restcountries.com/

// TODO do I really need to use express for this? Just combine it into the react app?

router.get('/', async (req, res, next) => {
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
    const independentCountriesArray = [];
    const countryCodeMapping = [];

    body.forEach(country => {
      const name = country.name.common;
      const officialName = country.name.official;
      officialCountryNameArray.push(officialName);
      if (country.unMember && country.independent) {
        independentCountriesArray.push(name);
        const code = country.cioc;
        const countryMappingObj = {
          name,
          code,
        };
        countryCodeMapping.push(countryMappingObj);
      }
    });

    const returnObject = {
      officialCountryNames: officialCountryNameArray.sort(), // TODO Also add Taiwan, Greenland, Kosovo, Palestine (and more) to this?
      independentCountriesArray: independentCountriesArray.sort(),
      countryCodeMapping,
    }
    res.status(200).send(returnObject);

  } catch (error) {
    res.status(404).send('ERROR');
  }
});

module.exports = router;
