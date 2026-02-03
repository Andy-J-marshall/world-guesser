export function capitalizeText(stringArray: any[] | any): string {
    let stringArrayAsString = '';
    const array = Array.isArray(stringArray) ? stringArray : [stringArray];
    array.forEach((originalString: any, index: number) => {
        const splitString = originalString.toString().split(' ');
        splitString.forEach((_: string, idx: number, arr: string[]) => {
            arr[idx] = arr[idx].charAt(0).toUpperCase() + arr[idx].slice(1);
        });
        const capitalizedString = splitString.join(' ');
        stringArrayAsString = index === 0 ? capitalizedString : stringArrayAsString + ', ' + capitalizedString;
        stringArrayAsString = stringArrayAsString.replace(' And ', ' & ');
    });
    return stringArrayAsString;
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
