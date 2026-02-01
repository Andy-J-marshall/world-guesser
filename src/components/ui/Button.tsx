import { Button  } from 'react-bootstrap';
import { ButtonProps } from '../../types';

function CustomButton(props: ButtonProps) {
    const callback = props.callback;
    const buttonText = props.buttonText;

    return (
        <div>
            <Button variant='light' size='lg' onClick={callback}>{buttonText}</Button>
        </div>
    );
}

export default CustomButton;
