export const STORAGE_KEYS = {
    // Mystery Country game stats
    COUNTRY_STREAK: 'streak',
    COUNTRY_WINS: 'numberOfWins',
    COUNTRY_GAMES: 'numberOfGames',
    COUNTRY_ATTEMPTS: 'numberOfAttempts',

    // Find Neighbours game stats
    BORDER_STREAK: 'borderStreak',
    BORDER_WINS: 'numberOfBorderWins',
    BORDER_GAMES: 'numberOfBorderGames',
    BORDER_ATTEMPTS: 'numberOfBorderAttempts',
    BORDER_CORRECT_ANSWERS: 'numberOfCorrectBorderAnswers',
    BORDER_INCORRECT_ANSWERS: 'numberOfIncorrectBorderAnswers',

    // Shared recent countries for both modes
    COUNTRY_RECENT: 'recentCountries',
} as const;

export const MYSTERY_COUNTRY_KEYS = {
    wins: STORAGE_KEYS.COUNTRY_WINS,
    games: STORAGE_KEYS.COUNTRY_GAMES,
    attempts: STORAGE_KEYS.COUNTRY_ATTEMPTS,
    streak: STORAGE_KEYS.COUNTRY_STREAK,
} as const;

export const NEIGHBOURS_KEYS = {
    wins: STORAGE_KEYS.BORDER_WINS,
    games: STORAGE_KEYS.BORDER_GAMES,
    attempts: STORAGE_KEYS.BORDER_ATTEMPTS,
    streak: STORAGE_KEYS.BORDER_STREAK,
    correctAnswers: STORAGE_KEYS.BORDER_CORRECT_ANSWERS,
    incorrectAnswers: STORAGE_KEYS.BORDER_INCORRECT_ANSWERS,
} as const;
