import { Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import ValidationToast from './ValidationToast';

import 'react-bootstrap-typeahead/css/Typeahead.css';

interface CountryFormProps {
    possibleCountries: string[];
    value: string[];
    setValue: (value: string[]) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    duplicateGuess?: boolean;
    knownCountry?: boolean;
    actualCountry?: boolean;
    isLastAttempt?: boolean;
}

function CountryForm({
    possibleCountries,
    value,
    setValue,
    handleSubmit,
    duplicateGuess = false,
    knownCountry = true,
    actualCountry = false,
    isLastAttempt = false,
}: CountryFormProps) {
    return (
        <Form onSubmit={handleSubmit}>
            <Fragment>
                {isLastAttempt && (
                    <div className='last-attempt-warning'>
                        FINAL ATTEMPT
                    </div>
                )}
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
            <ValidationToast
                actualCountry={actualCountry}
                duplicateGuess={duplicateGuess}
                knownCountry={knownCountry}
            />
            <div className='btn-container'>
                <Button id='guess-button' variant='light' type='submit'>
                    Guess
                </Button>
            </div>
        </Form>
    );
}

export default CountryForm;
