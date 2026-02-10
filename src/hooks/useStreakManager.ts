import { useState, useEffect } from 'react';

function useStreakManager(storageKey: string, action: 'increment' | 'reset'): number {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        if (action === 'increment') {
            const currentStreak = JSON.parse(localStorage.getItem(storageKey) || '0') || 0;
            const newStreak = currentStreak + 1;
            setStreak(newStreak);

            try {
                localStorage.setItem(storageKey, JSON.stringify(newStreak));
            } catch (error) {
                console.log(`Unable to update ${storageKey}`);
            }
        } else {
            try {
                localStorage.setItem(storageKey, '0');
            } catch (error) {
                console.log(`Unable to reset ${storageKey}`);
            }
        }
    }, [storageKey, action]);

    return streak;
}

export default useStreakManager;
