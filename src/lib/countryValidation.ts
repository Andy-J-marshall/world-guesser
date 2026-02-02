function checkValidGuess(guessedName: string, possibleCountries: string[], guesses: string[]) {
    let isValidCountry = false;
    let knownCountry = false;
    let duplicateGuess = false;
    if (guessedName.length > 0) {
        possibleCountries.find((country: string) => {
            if (country.toLowerCase() === guessedName) {
                knownCountry = true;
                isValidCountry = true;
            }
            if (guesses.includes(guessedName)) {
                duplicateGuess = true;
            }
        });
    }
    const returnObj = {
        isValidCountry,
        knownCountry,
        duplicateGuess,
    };
    return returnObj;
}

export default checkValidGuess;
