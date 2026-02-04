import { StatCard } from './StatCard';

interface StatsDisplayProps {
    title: string;
    stats: Array<{
        value: string | number;
        label: string;
        color: string;
        backgroundColor: string;
    }>;
    streak?: number;
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
                        marginBottom: streak && streak > 0 ? 'var(--spacing-lg)' : '0',
                    }}
                >
                    {stats.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </div>

                {streak && streak > 0 && (
                    <div
                        style={{
                            background:
                                'linear-gradient(135deg, rgba(192, 132, 252, 0.15), rgba(129, 140, 248, 0.15))',
                            padding: 'var(--spacing-md)',
                            borderRadius: 'var(--border-radius-md)',
                            border: '1px solid rgba(192, 132, 252, 0.3)',
                            textAlign: 'center',
                        }}
                    >
                        <p
                            style={{
                                color: 'var(--color-text-primary)',
                                fontWeight: '600',
                                margin: 0,
                            }}
                        >
                            You are on a{' '}
                            <span style={{ color: 'var(--color-secondary)', fontWeight: '700' }}>{streak}</span> game
                            winning streak!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export { StatsDisplay };
export type { StatsDisplayProps };
