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
                <Form.Group id='country-search' className='mb-3'>
                    <Typeahead
                        id='country-search-typeahead'
                        onChange={setValue}
                        options={possibleCountries}
                        placeholder='Countries'
                        selected={value}
                        size='lg'
                    />
                </Form.Group>
            </Fragment>
            <Button id='guess-button' variant='light' type='submit'>
                Guess
            </Button>
        </Form>
    )
}

export default CountryForm;
