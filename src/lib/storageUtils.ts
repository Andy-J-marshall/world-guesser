import { RECENT_COUNTRIES_MAX_SIZE } from '../constants/game';

export function getStorageNumber(key: string, defaultValue = 0): number {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return defaultValue;
        const parsed = JSON.parse(value);
        return typeof parsed === 'number' ? parsed : defaultValue;
    } catch (error) {
        console.warn(`Failed to read ${key} from localStorage:`, error);
        return defaultValue;
    }
}

export function setStorageValue(key: string, value: any): boolean {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Failed to write ${key} to localStorage:`, error);
        return false;
    }
}

export function removeStorageValue(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
}

export function getRecentCountries(key: string): string[] {
    try {
        const value = localStorage.getItem(key);
        if (value === null) return [];
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.warn(`Failed to read recent countries from localStorage:`, error);
        return [];
    }
}

export function addRecentCountry(key: string, countryName: string): void {
    try {
        const recent = getRecentCountries(key);
        const filtered = recent.filter((c) => c !== countryName);
        filtered.push(countryName);
        const trimmed = filtered.slice(-RECENT_COUNTRIES_MAX_SIZE);

        setStorageValue(key, trimmed);
    } catch (error) {
        console.warn(`Failed to add recent country to localStorage:`, error);
    }
}
