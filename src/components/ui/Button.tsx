import { Button } from 'react-bootstrap';
import { ButtonProps } from '../../types';

function CustomButton({ callback, buttonText }: ButtonProps) {
    return (
        <Button variant='light' size='lg' onClick={callback}>
            {buttonText}
        </Button>
    );
}

export default CustomButton;
