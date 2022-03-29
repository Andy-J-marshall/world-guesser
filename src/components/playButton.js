import React from 'react';
import { Button } from 'react-bootstrap';

function PlayButton(props) {
    const callback = props.callback;
    const buttonText = props.buttonText;

    return (
        <div id='new-game-button'>
            <Button variant='primary' size='lg' onClick={callback}>{buttonText}</Button>
        </div>
    );
}

export default PlayButton;
