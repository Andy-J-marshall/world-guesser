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
    const { countryCode } = req.query;
    if (!countryCode) {
      console.log('No country code exists for the selected country');
    }
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
    const response = await axios.get(url, {
      httpsAgent: agent,
    });
    const body = response.data[0];

    const returnObject = {
      name: body.name.common,
      borders: body.borders,
      capital: body.capital,
      landlocked: body.landlocked,
      map: body.maps.googleMaps,
      population: body.population,
      flags: body.flags.png,
      region: body.region,
      subregion: body.subregion,
    }
    res.status(200).send(returnObject);

  } catch (error) {
    res.status(404).send('ERROR');
  }
});

module.exports = router;
