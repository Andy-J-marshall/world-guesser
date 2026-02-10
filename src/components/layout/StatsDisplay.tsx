import { StatCard } from './StatCard';

interface StatsDisplayProps {
    title: string;
    stats: Array<{
        value: string | number;
        label: string;
        highlight?: boolean;
    }>;
    streak: number;
}

function StatsDisplay({ title, stats, streak }: StatsDisplayProps) {
    return (
        <div className='stats-display-container'>
            <div className='stats-display-card'>
                <h3 className='stats-display-title'>
                    {title}
                </h3>
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
