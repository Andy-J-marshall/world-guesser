import React, { useState, useEffect } from 'react';
import Country from './components/country';
import getAllCountriesRequest from './helpers/countryHelper';

function App() {
  const [allCountriesResponse, setAllCountriesResponse] = useState();
  const [foundCountry, setFindCountry] = useState(false);

  useEffect(() => {
    if (!foundCountry) {
      getAllCountriesRequest()
        .then(allCountriesResponse => {
          setFindCountry(true);
          setAllCountriesResponse(allCountriesResponse);
        });
    }
  });

  return (
    <div id='app'>
      <h1>FUN WITH COUNTRIES!</h1>
      {allCountriesResponse && <Country
        countriesInfo={allCountriesResponse}
      />}
      <link
        rel='stylesheet'
        href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
        integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
        crossOrigin='anonymous'
      />
    </div>
  );
}

export default App;
