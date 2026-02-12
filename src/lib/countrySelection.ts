import { Country, CountryCodeMapping, CountryInfo } from '../types';
import { capitalizeString, numberWithCommas } from './utils';

export function selectCountry(
    countriesArray: string[],
    countriesResponse: Country[],
    countryCodeMapping: CountryCodeMapping[],
    recentCountries: string[] = [],
): CountryInfo {
    let country = countriesResponse.find((c: Country) => c.useThis);
    if (!country) {
        const availableCountries = countriesArray.filter((c) => !recentCountries.includes(c.toLowerCase()));
        const selectionPool = availableCountries.length > 0 ? availableCountries : countriesArray;
        const selectedCountry = selectionPool[Math.floor(Math.random() * selectionPool.length)];
        country = countriesResponse.find((c: Country) => c.name.common.toLowerCase() === selectedCountry.toLowerCase());
    }
    if (!country) {
        throw new Error('No country found');
    }

    const capitalValue = country.capital?.[0];
    const countryObj: CountryInfo = {
        name: country.name.common,
        borderingCountries: getBorderingCountries(country.borders, countryCodeMapping),
        capital: capitalValue ? capitalizeString(capitalValue) : 'N/A',
        landlocked: country.landlocked ? 'Yes' : 'No',
        population: numberWithCommas(country.population),
        flag: country.flags.png,
        region: country.region,
        subregion: country.subregion,
    };
    return countryObj;
}

function getBorderingCountries(
    borderingCountries: string[] | undefined,
    countryCodeMapping: CountryCodeMapping[],
): string[] {
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
