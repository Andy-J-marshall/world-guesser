interface StatCardProps {
    value: string | number;
    label: string;
    color: string;
    backgroundColor: string;
}

function StatCard({ value, label, color, backgroundColor }: StatCardProps) {
    return (
        <div
            style={{
                background: backgroundColor,
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--border-radius-md)',
                border: `1px solid rgba(52, 211, 153, 0.2)`,
                textAlign: 'center',
            }}
        >
            <p
                className='large-stat'
                style={{
                    fontWeight: '700',
                    color: color,
                    margin: '0 0 var(--spacing-xs) 0',
                }}
            >
                {value}
            </p>
            <p
                className='small-text'
                style={{
                    color: 'var(--color-text-secondary)',
                    margin: 0,
                }}
            >
                {label}
            </p>
        </div>
    );
}

export { StatCard };
export type { StatCardProps };
