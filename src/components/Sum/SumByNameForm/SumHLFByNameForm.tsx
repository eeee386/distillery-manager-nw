import * as React from 'react'
import {reduxForm, Form} from 'redux-form';
import '../SumByForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'

const SumHLFByNameForm = (props: any) => (
  <Form onSubmit={props.handleSubmit} className={'sum-form'}>
    {renderFormInput('Név', 'name')}
    <button className={'button is-primary'} onClick={props.handleSubmit}>Hektoliterfok összegzés név alapján</button>
  </Form>
);

export default reduxForm({})(SumHLFByNameForm);
