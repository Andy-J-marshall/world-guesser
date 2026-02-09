import GameStats from '../../../components/layout/GameStats';

function CountryGuesserStats() {
    return (
        <GameStats
            storageKeys={{
                wins: 'numberOfWins',
                games: 'numberOfGames',
                attempts: 'numberOfAttempts',
                streak: 'streak',
            }}
        />
    );
}

export default CountryGuesserStats;
