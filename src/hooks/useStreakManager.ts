import { useState, useEffect, useRef } from 'react';
import { getStorageNumber, setStorageValue } from '../lib/storageUtils';

function useStreakManager(storageKey: string, action: 'increment' | 'reset'): number {
    const [streak, setStreak] = useState(0);
    const streakUpdated = useRef(false);

    useEffect(() => {
        if (streakUpdated.current) return;
        streakUpdated.current = true;

        if (action === 'increment') {
            const currentStreak = getStorageNumber(storageKey, 0);
            const newStreak = currentStreak + 1;
            setStreak(newStreak);
            setStorageValue(storageKey, newStreak);
        } else {
            setStreak(0);
            setStorageValue(storageKey, 0);
        }
    }, [storageKey, action]);

    return streak;
}

export default useStreakManager;
