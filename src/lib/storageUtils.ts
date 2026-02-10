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
