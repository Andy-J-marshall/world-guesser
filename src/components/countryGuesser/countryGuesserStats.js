import React, { useState, useEffect } from 'react';

function CountryGuesserStats(props) {
    const updateStats = props.updateStatsCallback;
    const country = props.country;
    const numberOfGuesses = props.numberOfGuesses;

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

        // TODO should this live in the updateStats callback?
        // TODO also add to failure page
        // TODO need a way of displaying the info (optionally)
        const countryHighScores = JSON.parse(localStorage.getItem('countryHighScores')) || allCountryStats;
        const previousBestScore = countryHighScores[country];
        console.log({ numberOfGuesses })
        console.log({ previousBestScore })
        if (numberOfGuesses < previousBestScore || previousBestScore <= 0) {
            countryHighScores[country] = numberOfGuesses;
            setHighScore(true);
            localStorage.setItem('countryHighScores', JSON.stringify(countryHighScores));
        }
    }, [called]);

    return (
        <div id='country-guesser-stats'>
            {numberOfAttempts > 0 && numberOfGames > 0 && <div>
                <h1>Stats</h1>
                {numberOfWins > 0 && highScore && <p>That was your best score for {country}!</p>}
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
    'Afghanistan': -1,
    'Albania': -1,
    'Algeria': -1,
    'Andorra': -1,
    'Angola': -1,
    'Antigua and Barbuda': -1,
    'Argentina': -1,
    'Armenia': -1,
    'Australia': -1,
    'Austria': -1,
    'Azerbaijan': -1,
    'Bahamas': -1,
    'Bahrain': -1,
    'Bangladesh': -1,
    'Barbados': -1,
    'Belarus': -1,
    'Belgium': -1,
    'Belize': -1,
    'Benin': -1,
    'Bhutan': -1,
    'Bolivia': -1,
    'Bosnia and Herzegovina': -1,
    'Botswana': -1,
    'Brazil': -1,
    'Brunei': -1,
    'Bulgaria': -1,
    'Burkina Faso': -1,
    'Burundi': -1,
    'Cambodia': -1,
    'Cameroon': -1,
    'Canada': -1,
    'Cape Verde': -1,
    'Central African Republic': -1,
    'Chad': -1,
    'Chile': -1,
    'China': -1,
    'Colombia': -1,
    'Comoros': -1,
    'Costa Rica': -1,
    'Croatia': -1,
    'Cuba': -1,
    'Cyprus': -1,
    'Czechia': -1,
    'DR Congo': -1,
    'Denmark': -1,
    'Djibouti': -1,
    'Dominica': -1,
    'Dominican Republic': -1,
    'Ecuador': -1,
    'Egypt': -1,
    'El Salvador': -1,
    'Equatorial Guinea': -1,
    'Eritrea': -1,
    'Estonia': -1,
    'Eswatini': -1,
    'Ethiopia': -1,
    'Fiji': -1,
    'Finland': -1,
    'France': -1,
    'Gabon': -1,
    'Gambia': -1,
    'Georgia': -1,
    'Germany': -1,
    'Ghana': -1,
    'Greece': -1,
    'Greenland': -1,
    'Grenada': -1,
    'Guatemala': -1,
    'Guinea': -1,
    'Guyana': -1,
    'Haiti': -1,
    'Honduras': -1,
    'Hungary': -1,
    'Iceland': -1,
    'India': -1,
    'Indonesia': -1,
    'Iran': -1,
    'Iraq': -1,
    'Ireland': -1,
    'Israel': -1,
    'Italy': -1,
    'Ivory Coast': -1,
    'Jamaica': -1,
    'Japan': -1,
    'Jordan': -1,
    'Kazakhstan': -1,
    'Kenya': -1,
    'Kiribati': -1,
    'Kosovo': -1,
    'Kuwait': -1,
    'Kyrgyzstan': -1,
    'Laos': -1,
    'Latvia': -1,
    'Lebanon': -1,
    'Lesotho': -1,
    'Liberia': -1,
    'Libya': -1,
    'Liechtenstein': -1,
    'Lithuania': -1,
    'Luxembourg': -1,
    'Madagascar': -1,
    'Malawi': -1,
    'Malaysia': -1,
    'Maldives': -1,
    'Mali': -1,
    'Malta': -1,
    'Marshall Islands': -1,
    'Mauritania': -1,
    'Mauritius': -1,
    'Mexico': -1,
    'Micronesia': -1,
    'Moldova': -1,
    'Monaco': -1,
    'Mongolia': -1,
    'Montenegro': -1,
    'Morocco': -1,
    'Mozambique': -1,
    'Myanmar': -1,
    'Namibia': -1,
    'Nauru': -1,
    'Nepal': -1,
    'Netherlands': -1,
    'New Zealand': -1,
    'Nicaragua': -1,
    'Niger': -1,
    'Nigeria': -1,
    'North Korea': -1,
    'North Macedonia': -1,
    'Norway': -1,
    'Oman': -1,
    'Pakistan': -1,
    'Palau': -1,
    'Palestine': -1,
    'Panama': -1,
    'Papua New Guinea': -1,
    'Paraguay': -1,
    'Peru': -1,
    'Philippines': -1,
    'Poland': -1,
    'Portugal': -1,
    'Qatar': -1,
    'Republic of the Congo': -1,
    'Romania': -1,
    'Russia': -1,
    'Rwanda': -1,
    'Saint Kitts and Nevis': -1,
    'Saint Lucia': -1,
    'Saint Vincent and the Grenadines': -1,
    'Samoa': -1,
    'San Marino': -1,
    'Saudi Arabia': -1,
    'Senegal': -1,
    'Serbia': -1,
    'Seychelles': -1,
    'Sierra Leone': -1,
    'Singapore': -1,
    'Slovakia': -1,
    'Slovenia': -1,
    'Solomon Islands': -1,
    'Somalia': -1,
    'South Africa': -1,
    'South Korea': -1,
    'South Sudan': -1,
    'Spain': -1,
    'Sri Lanka': -1,
    'Sudan': -1,
    'Suriname': -1,
    'Sweden': -1,
    'Switzerland': -1,
    'Syria': -1,
    'São Tomé and Príncipe': -1,
    'Taiwan': -1,
    'Tajikistan': -1,
    'Tanzania': -1,
    'Thailand': -1,
    'Timor-Leste': -1,
    'Togo': -1,
    'Tonga': -1,
    'Trinidad and Tobago': -1,
    'Tunisia': -1,
    'Turkey': -1,
    'Turkmenistan': -1,
    'Tuvalu': -1,
    'Uganda': -1,
    'Ukraine': -1,
    'United Arab Emirates': -1,
    'United Kingdom': -1,
    'United States': -1,
    'Uruguay': -1,
    'Uzbekistan': -1,
    'Vanuatu': -1,
    'Vatican City': -1,
    'Venezuela': -1,
    'Vietnam': -1,
    'Western Sahara': -1,
    'Yemen': -1,
    'Zambia': -1,
    'Zimbabwe': -1,
}