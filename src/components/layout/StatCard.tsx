interface StatCardProps {
    value: string | number;
    label: string;
    highlight?: boolean;
}

function StatCard({ value, label, highlight = false }: StatCardProps) {
    return (
        <div className={`stat-card ${highlight ? 'stat-card-highlight' : ''}`}>
            <p className='large-stat stat-card-value'>
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
