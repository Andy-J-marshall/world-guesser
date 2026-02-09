interface StreakDisplayProps {
    streak: number;
    threshold?: number;
}

function StreakDisplay({ streak, threshold = 3 }: StreakDisplayProps) {
    if (streak === 0) return null;

    return (
        <div className='success-streak-display'>
            <div className='success-streak-card'>
                <div className='success-streak-label'>Win Streak</div>
                <div className='success-streak-number'>{streak}</div>
                {streak >= threshold && <div className='success-streak-message'>Keep it going!</div>}
            </div>
        </div>
    );
}

export default StreakDisplay;
