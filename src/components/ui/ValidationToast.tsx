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
            setMessage('Already guessed that one');
            setShow(true);
        } else if (!knownCountry) {
            setMessage("That's not a recognised country");
            setShow(true);
        } else if (actualCountry) {
            setMessage("That's the country itself. Try its neighbours");
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
