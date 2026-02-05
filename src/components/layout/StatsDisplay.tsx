import { StatCard } from './StatCard';

interface StatsDisplayProps {
    title: string;
    stats: Array<{
        value: string | number;
        label: string;
        color: string;
        backgroundColor: string;
    }>;
    streak: number;
}

function StatsDisplay({ title, stats, streak }: StatsDisplayProps) {
    return (
        <div className='stats-display-container'>
            <div className='stats-display-card'>
                <h2 className='stats-display-title'>
                    {title}
                </h2>

                <div className={`stats-display-grid ${streak > 0 ? 'with-streak' : ''}`}>
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { StatsDisplay };
export type { StatsDisplayProps };
