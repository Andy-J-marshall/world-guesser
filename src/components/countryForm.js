import React, { Fragment } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';

import 'react-bootstrap-typeahead/css/Typeahead.css';

function CountryForm(props) {
    const possibleCountries = props.possibleCountries;
    const value = props.value;
    const setValue = props.setValue;
    const handleSubmit = props.handleSubmit;

    return (
        <Form onSubmit={handleSubmit}>
            <Fragment>
                <Form.Group className='mb-3'>
                    <Typeahead
                        id='country-search'
                        onChange={setValue}
                        options={possibleCountries}
                        placeholder='Select your country'
                        selected={value}
                    />
                </Form.Group>
            </Fragment>
            <Button variant='primary' type='submit'>
                Guess
            </Button>
        </Form>
    )
}

export default CountryForm;
