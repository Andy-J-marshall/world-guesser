import axios from 'axios';
import { Country, CountryCodeMapping, CountriesInfo } from '../types';

async function allCountriesRequest(): Promise<CountriesInfo | undefined> {
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

        const returnObject: CountriesInfo = {
            countriesArray: countriesArray.sort(),
            countryCodeMapping,
            responseBody: body,
        };
        return returnObject;
    } catch (error) {
        console.log(error);
    }
}

export default allCountriesRequest;
