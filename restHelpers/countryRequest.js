const axios = require('axios');;
const https = require('https');

async function countryRequest(countryCode) {
  try {
    // TODO do I still have to do this?
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
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
    };

    return returnObject;

  } catch (error) {
    console.log(error);
  }
};

module.exports = countryRequest;
