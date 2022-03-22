import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Country from './country';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function FailurePage(props) {
    const name = props.name;
    const flag = props.flag;
    const map = props.map;

    const [newGameStarted, setNewGameStarted] = useState(false);

    function a() {
        setNewGameStarted(true);
    }

    return (
        <div>
            {!newGameStarted && < div id='incorrect-guess' >
                <p style={{ color: 'red' }}>YOU LOST</p>
                {<p>The answer was <a href={map}>{name}</a></p>}
                {<img style={{ border: 'solid' }} src={flag} alt='Country Flag' />}
            </div >}
            {!newGameStarted && <div id='retry-button'>
                <br />
                <Button variant='primary' size='lg' onClick={a}>Try again</Button>
            </div>}
            {newGameStarted && <Country />}
            {/* TODO add option to guess the bordering countries here as well? And make a component */}
        </div>
    )
}

export default FailurePage;
