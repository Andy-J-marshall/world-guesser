import axios from 'axios';
import { capitalizeText, numberWithCommas } from './utils';

interface Country {
    name: {
        common: string;
    };
    independent?: boolean;
    cca3: string;
    borders?: string[];
    capital?: string[];
    landlocked: boolean;
    maps: {
        googleMaps: string;
    };
    population: number;
    flags: {
        png: string;
    };
    region: string;
    subregion: string;
    useThis?: boolean;
}

interface CountryCodeMapping {
    name: string;
    code: string;
}

interface AllCountriesResponse {
    countriesArray: string[];
    countryCodeMapping: CountryCodeMapping[];
    responseBody: Country[];
}

interface CountryObj {
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

async function allCountriesRequest(): Promise<AllCountriesResponse | undefined> {
    try {
        const response = await axios.get<Country[]>(
            `https://restcountries.com/v3.1/all?fields=name,independent,cca3,capital,landlocked,maps,population,flags,region,subregion`,
        );
        const body = response.data;

        const countriesArray: string[] = [];
        const countryCodeMapping: CountryCodeMapping[] = [];
        const extraCountries = ['Taiwan', 'Greenland', 'Palestine', 'Kosovo', 'Western Sahara'];

        body.forEach((country: Country) => {
            const name = country.name.common;
            if (country.independent || extraCountries.includes(name)) {
                countriesArray.push(name);
                const code = country.cca3;
                const countryMappingObj: CountryCodeMapping = {
                    name,
                    code,
                };
                countryCodeMapping.push(countryMappingObj);
            }
        });

        const returnObject: AllCountriesResponse = {
            countriesArray: countriesArray.sort(),
            countryCodeMapping,
            responseBody: body,
        };
        return returnObject;
    } catch (error) {
        console.log(error);
    }
}

export function selectCountry(
    countriesArray: string[],
    countriesResponse: Country[],
    countryCodeMapping: CountryCodeMapping[],
): CountryObj {
    let country = countriesResponse.find((c: Country) => c.useThis);
    if (!country) {
        const selectedCountry = countriesArray[Math.floor(Math.random() * countriesArray.length)];
        country = countriesResponse.find((c: Country) => c.name.common.toLowerCase() === selectedCountry.toLowerCase());
    }
    if (!country) {
        throw new Error('No country found');
    }

    const countryObj: CountryObj = {
        name: country.name.common,
        borderingCountries: returnBorderingCountries(country.borders, countryCodeMapping),
        capital: capitalizeText(country.capital),
        landlocked: country.landlocked ? 'Yes' : 'No',
        map: country.maps.googleMaps,
        population: numberWithCommas(country.population),
        flag: country.flags.png,
        region: country.region,
        subregion: country.subregion,
    };
    return countryObj;
}

function returnBorderingCountries(borderingCountries: string[] | undefined, countryCodeMapping: CountryCodeMapping[]): string[] {
    const answerCountries: string[] = [];
    if (borderingCountries) {
        borderingCountries.forEach((borderingCountry: string) => {
            countryCodeMapping.find((country: CountryCodeMapping) => {
                if (country.code === borderingCountry) {
                    answerCountries.push(country.name);
                }
            });
        });
    }
    return answerCountries;
}

export default allCountriesRequest;
