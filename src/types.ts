// Common types used across components

// Raw country data from REST Countries API
export interface Country {
    name: {
        common: string;
    };
    independent?: boolean;
    cca3: string;
    borders: string[];
    capital: string[];
    landlocked: boolean;
    population: number;
    flags: {
        png: string;
    };
    region: string;
    subregion: string;
    useThis?: boolean;
}

// Processed country information for display
export interface CountryInfo {
    name: string;
    borderingCountries: string[];
    capital: string;
    landlocked: string;
    population: string;
    flag: string;
    region: string;
    subregion: string;
}

export interface CountryCodeMapping {
    name: string;
    code: string;
}

export interface CountriesInfo {
    countriesArray: string[];
    countryCodeMapping: CountryCodeMapping[];
    responseBody: Country[];
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

export interface ValidationErrorsProps {
    duplicateGuess?: boolean;
    knownCountry?: boolean;
    children?: React.ReactNode;
}

export interface StartNewGameProps {
    buttonText: string;
}

export interface CountryFormProps {
    possibleCountries: string[];
    submitCallback: (event: React.FormEvent) => void;
}
