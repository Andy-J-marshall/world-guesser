import React from 'react';
import { Button } from 'react-bootstrap';

function PlayButton(props) {
    const callback = props.callback;
    const buttonText = props.buttonText;

    // TODO improve how this works so it doesn't need to be clicked so many times when creating a new game
    return (
        <div id='new-game-button'>
            <br />
            <Button variant='primary' size='lg' onClick={callback}>{buttonText}</Button>
        </div>
    );
}

export default PlayButton;
