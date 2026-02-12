export const STORAGE_KEYS = {
    // Country Guesser game stats
    COUNTRY_STREAK: 'streak',
    COUNTRY_WINS: 'numberOfWins',
    COUNTRY_GAMES: 'numberOfGames',
    COUNTRY_ATTEMPTS: 'numberOfAttempts',
    COUNTRY_RECENT: 'recentCountries',

    // Bordering Countries game stats
    BORDER_STREAK: 'borderStreak',
    BORDER_WINS: 'numberOfBorderWins',
    BORDER_GAMES: 'numberOfBorderGames',
    BORDER_ATTEMPTS: 'numberOfBorderAttempts',
    BORDER_CORRECT_ANSWERS: 'numberOfCorrectBorderAnswers',
    BORDER_INCORRECT_ANSWERS: 'numberOfIncorrectBorderAnswers',
    BORDER_RECENT: 'recentBorderCountries',
} as const;

export const COUNTRY_GUESSER_KEYS = {
    wins: STORAGE_KEYS.COUNTRY_WINS,
    games: STORAGE_KEYS.COUNTRY_GAMES,
    attempts: STORAGE_KEYS.COUNTRY_ATTEMPTS,
    streak: STORAGE_KEYS.COUNTRY_STREAK,
} as const;

export const BORDERING_COUNTRIES_KEYS = {
    wins: STORAGE_KEYS.BORDER_WINS,
    games: STORAGE_KEYS.BORDER_GAMES,
    attempts: STORAGE_KEYS.BORDER_ATTEMPTS,
    streak: STORAGE_KEYS.BORDER_STREAK,
    correctAnswers: STORAGE_KEYS.BORDER_CORRECT_ANSWERS,
    incorrectAnswers: STORAGE_KEYS.BORDER_INCORRECT_ANSWERS,
} as const;
