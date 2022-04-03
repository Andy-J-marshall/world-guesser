import React from 'react';

function CountryClues(props) {
    const countryNameClue = props.countryNameClue;
    const borderingCountryClues = props.borderingCountryClues;

    return (
        <div id='country-initial-clue'>
            {countryNameClue && <p>The country begins with the following letter: {countryNameClue}</p>}
            {borderingCountryClues && <p>The remaining bordering countries begin with the following letters: {borderingCountryClues}</p>}
        </div>
    );
}

export default CountryClues;
