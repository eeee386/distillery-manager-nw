import * as React from 'react'
import '../SumByForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {Form, reduxForm} from 'redux-form'

const SumWeightByTaxIDForm = (props: any) => (
      <Form onSubmit={props.handleSubmit} className={'sum-form'}>
        {renderFormInput('AdóSzám', 'taxID')}
        <button className={'button is-primary'} onClick={props.handleSubmit}>Tömeg összegzés adószám alapján</button>
      </Form>
);

export default reduxForm({})(SumWeightByTaxIDForm);