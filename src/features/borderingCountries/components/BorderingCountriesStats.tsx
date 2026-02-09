import GameStats from '../../../components/layout/GameStats';

function BorderingCountriesStats() {
    return (
        <GameStats
            storageKeys={{
                wins: 'numberOfBorderWins',
                games: 'numberOfBorderGames',
                attempts: 'numberOfBorderAttempts',
                streak: 'borderStreak',
                correctAnswers: 'numberOfCorrectBorderAnswers',
                incorrectAnswers: 'numberOfIncorrectBorderAnswers',
            }}
        />
    );
}

export default BorderingCountriesStats;
