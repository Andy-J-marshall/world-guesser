import React from 'react';
import { Button  } from 'react-bootstrap';

function CustomButton(props) {
    const callback = props.callback;
    const buttonText = props.buttonText;

    return (
        <div>
            <Button variant='primary' size='lg' onClick={callback}>{buttonText}</Button>
        </div>
    );
}

export default CustomButton;
