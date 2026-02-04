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
        <div style={{ maxWidth: '700px', margin: '0 auto', marginTop: 'var(--spacing-xl)' }}>
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.6)',
                    borderRadius: 'var(--border-radius-lg)',
                    padding: 'var(--spacing-xl)',
                    border: '1px solid rgba(129, 140, 248, 0.3)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                <h2
                    style={{
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--color-primary-light)',
                        textAlign: 'center',
                    }}
                >
                    {title}
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: 'var(--spacing-md)',
                        marginBottom: streak > 0 ? 'var(--spacing-lg)' : 0,
                    }}
                >
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
