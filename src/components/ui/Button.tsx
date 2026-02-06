import { Button } from 'react-bootstrap';
import { ButtonProps } from '../../types';

function CustomButton({ callback, buttonText, variant = 'light' }: ButtonProps) {
    return (
        <Button variant={variant} size='lg' onClick={callback}>
            {buttonText}
        </Button>
    );
}

export default CustomButton;
