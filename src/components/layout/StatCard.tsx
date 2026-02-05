interface StatCardProps {
    value: string | number;
    label: string;
    color: string;
    backgroundColor: string;
}

function StatCard({ value, label, color, backgroundColor }: StatCardProps) {
    return (
        <div className='stat-card' style={{ background: backgroundColor }}>
            <p className='large-stat stat-card-value' style={{ color: color }}>
                {value}
            </p>
            <p className='small-text stat-card-label'>
                {label}
            </p>
        </div>
    );
}

export { StatCard };
export type { StatCardProps };
