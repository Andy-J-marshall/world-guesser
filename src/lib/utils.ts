export function capitalizeString(str: string | string[] | undefined): string {
    if (!str) return '';
    if (Array.isArray(str)) {
        return capitalizeStringArray(str);
    }
    const words = str.toString().split(' ');
    const capitalizedWords = words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(' ').replace(' And ', ' & ');
}

export function capitalizeStringArray(stringArray: string[]): string {
    if (!stringArray || stringArray.length === 0) return '';
    return stringArray
        .map(str => capitalizeString(str))
        .join(', ')
        .replace(' And ', ' & ');
}

export function capitalizeText(stringArray: string[] | string | undefined): string {
    if (!stringArray) return '';
    return Array.isArray(stringArray) 
        ? capitalizeStringArray(stringArray)
        : capitalizeString(stringArray);
}

export function numberWithCommas(number: number): string {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
    const item = localStorage.getItem(key);
    if (item === null) {
        return defaultValue;
    }
    try {
        return JSON.parse(item) as T;
    } catch {
        return defaultValue;
    }
}
