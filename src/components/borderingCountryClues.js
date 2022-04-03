import React from 'react';

function BorderingCountryClues(props) {
    const clues = props.clues;

    return (
        <div id='bordering-country-clues'>
            <p>The remaining bordering countries begin with the following letters: {clues}</p>
        </div>
    );
}

export default BorderingCountryClues;
