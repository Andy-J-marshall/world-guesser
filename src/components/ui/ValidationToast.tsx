import { useEffect, useState } from 'react';

interface ValidationToastProps {
    duplicateGuess?: boolean;
    knownCountry?: boolean;
    actualCountry?: boolean;
}

function ValidationToast({ duplicateGuess, knownCountry, actualCountry }: ValidationToastProps) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (duplicateGuess) {
            setMessage("You've already tried that country!");
            setShow(true);
        } else if (!knownCountry) {
            setMessage('Enter a valid country name');
            setShow(true);
        } else if (actualCountry) {
            setMessage("That's the actual country! Guess the bordering ones instead");
            setShow(true);
        }

        if (duplicateGuess || !knownCountry || actualCountry) {
            const timer = setTimeout(() => {
                setShow(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [duplicateGuess, knownCountry, actualCountry]);

    if (!show) {
        return null;
    }

    return (
        <div className='validation-toast'>
            <div className='validation-toast-content'>
                {message}
            </div>
        </div>
    );
}

export default ValidationToast;
