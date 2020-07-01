import * as React from 'react'
import './SearchByTaxIDForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {Form, reduxForm} from 'redux-form'

const SearchByTaxIDForm = (props: any) => (
      <Form onSubmit={props.handleSubmit}>
        {renderFormInput('AdóSzám', 'taxID')}
        <button className={'button is-primary'} onClick={props.handleSubmit}>Keresés adószám alapján</button>
      </Form>
);

export default reduxForm({form: 'SearchByTaxIDForm'})(SearchByTaxIDForm);