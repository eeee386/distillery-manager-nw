import * as React from 'react'
import {reduxForm, Form} from 'redux-form';
import '../SumByForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'

const SumWeightByNameForm = (props: any) => (
  <Form onSubmit={props.handleSubmit} className={'sum-form'}>
    {renderFormInput('Név', 'name')}
    <button className={'button is-primary'} onClick={props.handleSubmit}>Tömeg összegzés név alapján</button>
  </Form>
);

export default reduxForm({})(SumWeightByNameForm);
