import { Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import BasicValidation from '../validation/BasicValidation';

import 'react-bootstrap-typeahead/css/Typeahead.css';

interface CountryFormProps {
    possibleCountries: string[];
    value: string[];
    setValue: (value: string[]) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    duplicateGuess?: boolean;
    knownCountry?: boolean;
}

function CountryForm(props: CountryFormProps) {
    const possibleCountries = props.possibleCountries;
    const value = props.value;
    const setValue = props.setValue;
    const handleSubmit = props.handleSubmit;
    const duplicateGuess = props.duplicateGuess ?? false;
    const knownCountry = props.knownCountry ?? true;

    return (
        <Form onSubmit={handleSubmit}>
            <Fragment>
                <Form.Group id='country-search' className='mb-3'>
                    <Typeahead
                        id='country-search-typeahead'
                        onChange={(selected: any) => setValue(selected as string[])}
                        options={possibleCountries}
                        placeholder='Countries...'
                        selected={value}
                        size='lg'
                    />
                </Form.Group>
            </Fragment>
            <BasicValidation duplicateGuess={duplicateGuess} knownCountry={knownCountry} />
            <div className='btn-container'>
                <Button id='guess-button' variant='light' type='submit'>
                    Guess
                </Button>
            </div>
        </Form>
    );
}

export default CountryForm;
