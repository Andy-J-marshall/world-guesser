import { useState, useEffect } from 'react';
import { getStorageNumber, setStorageValue } from '../lib/storageUtils';

function useStreakManager(storageKey: string, action: 'increment' | 'reset'): number {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        if (action === 'increment') {
            const currentStreak = getStorageNumber(storageKey, 0);
            const newStreak = currentStreak + 1;
            setStreak(newStreak);
            setStorageValue(storageKey, newStreak);
        } else {
            setStorageValue(storageKey, 0);
        }
    }, [storageKey, action]);

    return streak;
}

export default useStreakManager;
