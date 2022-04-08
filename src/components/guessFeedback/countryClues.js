import React from 'react';

function CountryClues(props) {
    const borderingCountryClues = props.borderingCountryClues;

    return (
        <div id='country-initial-clue'>
            {borderingCountryClues && <p>The remaining bordering countries begin with the following letters: {borderingCountryClues}</p>}
        </div>
    );
}

export default CountryClues;
