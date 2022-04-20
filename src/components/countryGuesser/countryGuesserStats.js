import React, { useState, useEffect } from 'react';

function CountryGuesserStats(props) {
    const updateStats = props.updateStatsCallback;
    const country = props.country;
    const numberOfGuesses = props.numberOfGuesses;
    const succeeded = props.succeeded;

    const [numberOfWins, setNumberOfWins] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [numberOfGames, setNumberOfGames] = useState(0);
    const [streak, setStreak] = useState(0);
    const [highScore, setHighScore] = useState(false);

    const called = true;

    useEffect(() => {
        const { numberOfWins, numberOfGames, numberOfAttempts, streak } = updateStats();
        setNumberOfWins(numberOfWins);
        setNumberOfGames(numberOfGames);
        setNumberOfAttempts(numberOfAttempts);
        setStreak(streak);
        localStorage.setItem('numberOfWins', JSON.stringify(numberOfWins));
        localStorage.setItem('numberOfGames', JSON.stringify(numberOfGames));
        localStorage.setItem('numberOfAttempts', JSON.stringify(numberOfAttempts));
        localStorage.setItem('streak', JSON.stringify(streak));

        // TODO should this live in the updateStats callback? Same with borders too
        // TODO need a way of displaying the info (optionally)
        // TODO check this works if it fails
        const countryHighScores = JSON.parse(localStorage.getItem('countryHighScores')) || allCountryStats;
        if (succeeded) {
            const previousBestScore = countryHighScores[country].best;
            if (!previousBestScore || numberOfGuesses < previousBestScore) {
                countryHighScores[country].best = numberOfGuesses;
                setHighScore(true);
            }
        } else {
            countryHighScores[country].best = 99;
        }
        localStorage.setItem('countryHighScores', JSON.stringify(countryHighScores));
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfAttempts > 0 && numberOfGames > 0 && <div>
                <h1>Stats</h1>
                {succeeded > 0 && highScore && <p>That was your best score for {country}!</p>}
                <p>Total games: {numberOfGames}</p>
                <p>Number of wins: {numberOfWins}</p>
                {numberOfWins > 0 && <p>Win percentage: {((numberOfWins / numberOfGames) * 100).toFixed(1)}%</p>}
                {numberOfWins > 0 && <p>Number of guesses per correct answer: {(numberOfAttempts / numberOfWins).toFixed(1)}</p>}
                {numberOfWins > 0 && streak > 0 && <p>You are on a {streak} game winning streak playing Country Guesser</p>}
            </div>}
        </div>
    );
}

export default CountryGuesserStats;

// TODO move this somewhere
const allCountryStats = {
    'Afghanistan': { best: null, bestBorders: null },
    'Albania': { best: null, bestBorders: null },
    'Algeria': { best: null, bestBorders: null },
    'Andorra': { best: null, bestBorders: null },
    'Angola': { best: null, bestBorders: null },
    'Antigua and Barbuda': { best: null, bestBorders: null },
    'Argentina': { best: null, bestBorders: null },
    'Armenia': { best: null, bestBorders: null },
    'Australia': { best: null, bestBorders: null },
    'Austria': { best: null, bestBorders: null },
    'Azerbaijan': { best: null, bestBorders: null },
    'Bahamas': { best: null, bestBorders: null },
    'Bahrain': { best: null, bestBorders: null },
    'Bangladesh': { best: null, bestBorders: null },
    'Barbados': { best: null, bestBorders: null },
    'Belarus': { best: null, bestBorders: null },
    'Belgium': { best: null, bestBorders: null },
    'Belize': { best: null, bestBorders: null },
    'Benin': { best: null, bestBorders: null },
    'Bhutan': { best: null, bestBorders: null },
    'Bolivia': { best: null, bestBorders: null },
    'Bosnia and Herzegovina': { best: null, bestBorders: null },
    'Botswana': { best: null, bestBorders: null },
    'Brazil': { best: null, bestBorders: null },
    'Brunei': { best: null, bestBorders: null },
    'Bulgaria': { best: null, bestBorders: null },
    'Burkina Faso': { best: null, bestBorders: null },
    'Burundi': { best: null, bestBorders: null },
    'Cambodia': { best: null, bestBorders: null },
    'Cameroon': { best: null, bestBorders: null },
    'Canada': { best: null, bestBorders: null },
    'Cape Verde': { best: null, bestBorders: null },
    'Central African Republic': { best: null, bestBorders: null },
    'Chad': { best: null, bestBorders: null },
    'Chile': { best: null, bestBorders: null },
    'China': { best: null, bestBorders: null },
    'Colombia': { best: null, bestBorders: null },
    'Comoros': { best: null, bestBorders: null },
    'Costa Rica': { best: null, bestBorders: null },
    'Croatia': { best: null, bestBorders: null },
    'Cuba': { best: null, bestBorders: null },
    'Cyprus': { best: null, bestBorders: null },
    'Czechia': { best: null, bestBorders: null },
    'DR Congo': { best: null, bestBorders: null },
    'Denmark': { best: null, bestBorders: null },
    'Djibouti': { best: null, bestBorders: null },
    'Dominica': { best: null, bestBorders: null },
    'Dominican Republic': { best: null, bestBorders: null },
    'Ecuador': { best: null, bestBorders: null },
    'Egypt': { best: null, bestBorders: null },
    'El Salvador': { best: null, bestBorders: null },
    'Equatorial Guinea': { best: null, bestBorders: null },
    'Eritrea': { best: null, bestBorders: null },
    'Estonia': { best: null, bestBorders: null },
    'Eswatini': { best: null, bestBorders: null },
    'Ethiopia': { best: null, bestBorders: null },
    'Fiji': { best: null, bestBorders: null },
    'Finland': { best: null, bestBorders: null },
    'France': { best: null, bestBorders: null },
    'Gabon': { best: null, bestBorders: null },
    'Gambia': { best: null, bestBorders: null },
    'Georgia': { best: null, bestBorders: null },
    'Germany': { best: null, bestBorders: null },
    'Ghana': { best: null, bestBorders: null },
    'Greece': { best: null, bestBorders: null },
    'Greenland': { best: null, bestBorders: null },
    'Grenada': { best: null, bestBorders: null },
    'Guatemala': { best: null, bestBorders: null },
    'Guinea': { best: null, bestBorders: null },
    'Guyana': { best: null, bestBorders: null },
    'Haiti': { best: null, bestBorders: null },
    'Honduras': { best: null, bestBorders: null },
    'Hungary': { best: null, bestBorders: null },
    'Iceland': { best: null, bestBorders: null },
    'India': { best: null, bestBorders: null },
    'Indonesia': { best: null, bestBorders: null },
    'Iran': { best: null, bestBorders: null },
    'Iraq': { best: null, bestBorders: null },
    'Ireland': { best: null, bestBorders: null },
    'Israel': { best: null, bestBorders: null },
    'Italy': { best: null, bestBorders: null },
    'Ivory Coast': { best: null, bestBorders: null },
    'Jamaica': { best: null, bestBorders: null },
    'Japan': { best: null, bestBorders: null },
    'Jordan': { best: null, bestBorders: null },
    'Kazakhstan': { best: null, bestBorders: null },
    'Kenya': { best: null, bestBorders: null },
    'Kiribati': { best: null, bestBorders: null },
    'Kosovo': { best: null, bestBorders: null },
    'Kuwait': { best: null, bestBorders: null },
    'Kyrgyzstan': { best: null, bestBorders: null },
    'Laos': { best: null, bestBorders: null },
    'Latvia': { best: null, bestBorders: null },
    'Lebanon': { best: null, bestBorders: null },
    'Lesotho': { best: null, bestBorders: null },
    'Liberia': { best: null, bestBorders: null },
    'Libya': { best: null, bestBorders: null },
    'Liechtenstein': { best: null, bestBorders: null },
    'Lithuania': { best: null, bestBorders: null },
    'Luxembourg': { best: null, bestBorders: null },
    'Madagascar': { best: null, bestBorders: null },
    'Malawi': { best: null, bestBorders: null },
    'Malaysia': { best: null, bestBorders: null },
    'Maldives': { best: null, bestBorders: null },
    'Mali': { best: null, bestBorders: null },
    'Malta': { best: null, bestBorders: null },
    'Marshall Islands': { best: null, bestBorders: null },
    'Mauritania': { best: null, bestBorders: null },
    'Mauritius': { best: null, bestBorders: null },
    'Mexico': { best: null, bestBorders: null },
    'Micronesia': { best: null, bestBorders: null },
    'Moldova': { best: null, bestBorders: null },
    'Monaco': { best: null, bestBorders: null },
    'Mongolia': { best: null, bestBorders: null },
    'Montenegro': { best: null, bestBorders: null },
    'Morocco': { best: null, bestBorders: null },
    'Mozambique': { best: null, bestBorders: null },
    'Myanmar': { best: null, bestBorders: null },
    'Namibia': { best: null, bestBorders: null },
    'Nauru': { best: null, bestBorders: null },
    'Nepal': { best: null, bestBorders: null },
    'Netherlands': { best: null, bestBorders: null },
    'New Zealand': { best: null, bestBorders: null },
    'Nicaragua': { best: null, bestBorders: null },
    'Niger': { best: null, bestBorders: null },
    'Nigeria': { best: null, bestBorders: null },
    'North Korea': { best: null, bestBorders: null },
    'North Macedonia': { best: null, bestBorders: null },
    'Norway': { best: null, bestBorders: null },
    'Oman': { best: null, bestBorders: null },
    'Pakistan': { best: null, bestBorders: null },
    'Palau': { best: null, bestBorders: null },
    'Palestine': { best: null, bestBorders: null },
    'Panama': { best: null, bestBorders: null },
    'Papua New Guinea': { best: null, bestBorders: null },
    'Paraguay': { best: null, bestBorders: null },
    'Peru': { best: null, bestBorders: null },
    'Philippines': { best: null, bestBorders: null },
    'Poland': { best: null, bestBorders: null },
    'Portugal': { best: null, bestBorders: null },
    'Qatar': { best: null, bestBorders: null },
    'Republic of the Congo': { best: null, bestBorders: null },
    'Romania': { best: null, bestBorders: null },
    'Russia': { best: null, bestBorders: null },
    'Rwanda': { best: null, bestBorders: null },
    'Saint Kitts and Nevis': { best: null, bestBorders: null },
    'Saint Lucia': { best: null, bestBorders: null },
    'Saint Vincent and the Grenadines': { best: null, bestBorders: null },
    'Samoa': { best: null, bestBorders: null },
    'San Marino': { best: null, bestBorders: null },
    'Saudi Arabia': { best: null, bestBorders: null },
    'Senegal': { best: null, bestBorders: null },
    'Serbia': { best: null, bestBorders: null },
    'Seychelles': { best: null, bestBorders: null },
    'Sierra Leone': { best: null, bestBorders: null },
    'Singapore': { best: null, bestBorders: null },
    'Slovakia': { best: null, bestBorders: null },
    'Slovenia': { best: null, bestBorders: null },
    'Solomon Islands': { best: null, bestBorders: null },
    'Somalia': { best: null, bestBorders: null },
    'South Africa': { best: null, bestBorders: null },
    'South Korea': { best: null, bestBorders: null },
    'South Sudan': { best: null, bestBorders: null },
    'Spain': { best: null, bestBorders: null },
    'Sri Lanka': { best: null, bestBorders: null },
    'Sudan': { best: null, bestBorders: null },
    'Suriname': { best: null, bestBorders: null },
    'Sweden': { best: null, bestBorders: null },
    'Switzerland': { best: null, bestBorders: null },
    'Syria': { best: null, bestBorders: null },
    'São Tomé and Príncipe': { best: null, bestBorders: null },
    'Taiwan': { best: null, bestBorders: null },
    'Tajikistan': { best: null, bestBorders: null },
    'Tanzania': { best: null, bestBorders: null },
    'Thailand': { best: null, bestBorders: null },
    'Timor-Leste': { best: null, bestBorders: null },
    'Togo': { best: null, bestBorders: null },
    'Tonga': { best: null, bestBorders: null },
    'Trinidad and Tobago': { best: null, bestBorders: null },
    'Tunisia': { best: null, bestBorders: null },
    'Turkey': { best: null, bestBorders: null },
    'Turkmenistan': { best: null, bestBorders: null },
    'Tuvalu': { best: null, bestBorders: null },
    'Uganda': { best: null, bestBorders: null },
    'Ukraine': { best: null, bestBorders: null },
    'United Arab Emirates': { best: null, bestBorders: null },
    'United Kingdom': { best: null, bestBorders: null },
    'United States': { best: null, bestBorders: null },
    'Uruguay': { best: null, bestBorders: null },
    'Uzbekistan': { best: null, bestBorders: null },
    'Vanuatu': { best: null, bestBorders: null },
    'Vatican City': { best: null, bestBorders: null },
    'Venezuela': { best: null, bestBorders: null },
    'Vietnam': { best: null, bestBorders: null },
    'Western Sahara': { best: null, bestBorders: null },
    'Yemen': { best: null, bestBorders: null },
    'Zambia': { best: null, bestBorders: null },
    'Zimbabwe': { best: null, bestBorders: null },
}
