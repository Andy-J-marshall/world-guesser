const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const https = require('https');

// https://restcountries.com/

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

    const countryNameArray = [];
    const officialCountryNameArray = [];
    const fullCountriesArray = [];

    body.forEach(country => {
      const name = country.name.common;
      countryNameArray.push(name);
      const officialName = country.name.official;
      officialCountryNameArray.push(officialName);
      if (country.unMember && country.independent) {
        fullCountriesArray.push(name);
      }
    });

    const returnObject = {
      countryNames: countryNameArray,
      officialCountryNames: officialCountryNameArray, // TODO do we need this?
      fullCountriesArray: fullCountriesArray,
    }
    res.status(200).send(returnObject);

  } catch (error) {
    res.status(404).send('ERROR');
  }
});

module.exports = router;
