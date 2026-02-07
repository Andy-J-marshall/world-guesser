import { useEffect, useState } from 'react';

interface FeedbackToastProps {
    message: string;
    show: boolean;
    type?: 'error' | 'success';
}

function FeedbackToast({ message, show, type = 'error' }: FeedbackToastProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (show && message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [show, message]);

    if (!visible) {
        return null;
    }

    return (
        <div className={`feedback-toast ${type === 'success' ? 'feedback-toast-success' : 'feedback-toast-error'}`}>
            <div className='feedback-toast-content'>
                {message}
            </div>
        </div>
    );
}

export default FeedbackToast;
