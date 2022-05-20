import React from 'react';
import { Button  } from 'react-bootstrap';

function CustomButton(props) {
    const callback = props.callback;
    const buttonText = props.buttonText;

    // TODO refactor this as I don't need a separate component?
    return (
        <div>
            <Button variant='light' size='lg' onClick={callback}>{buttonText}</Button>
        </div>
    );
}

export default CustomButton;
