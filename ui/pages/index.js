import React from 'react';
import Country from '../components/country';

// TODO tidy up CSS for whole app
// TODO change favicon
function App() {
  return (
    <div id='app'>
      <h1>FUN WITH COUNTRIES</h1>
      <Country />
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
