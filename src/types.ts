// Common types used across components

export interface CountryInfo {
    name: string;
    borderingCountries: string[];
    capital: string;
    landlocked: string;
    map: string;
    population: string;
    flag: string;
    region: string;
    subregion: string;
}

export interface CountriesInfo {
    countriesArray: string[];
    countryCodeMapping: Array<{ name: string; code: string }>;
    responseBody: any[];
}

export interface ButtonProps {
    callback: () => void;
    buttonText: string;
}

export interface CountryProps {
    countriesInfo: CountriesInfo;
}

export interface CountryGuesserProps {
    countriesInfo: CountriesInfo;
    country: CountryInfo;
    possibleCountries: string[];
}

export interface BasicValidationProps {
    children: React.ReactNode;
    display: boolean;
}

export interface StartNewGameProps {
    newGameCallback: () => void;
}

export interface CountryFormProps {
    possibleCountries: string[];
    submitCallback: (event: React.FormEvent) => void;
}
