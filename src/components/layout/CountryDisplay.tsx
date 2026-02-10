interface CountryDisplayProps {
    name: string;
    flag: string;
}

function CountryDisplay({ name, flag }: CountryDisplayProps) {
    return (
        <div className='success-country-display'>
            <img src={flag} className='success-flag' alt={`${name} flag`} />
            <div className='success-country-name'>{name}</div>
        </div>
    );
}

export default CountryDisplay;
