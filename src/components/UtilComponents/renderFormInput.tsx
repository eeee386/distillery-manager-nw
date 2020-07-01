import {Field} from 'redux-form';
import * as React from 'react'
import './renderFormInput.scss';

interface InputProps {input: {[key:string]: any}, meta: {touched: boolean, error: boolean}}

const formInput = (props: InputProps) => {
    const {touched, error} = props.meta;
    return <div><input className="form-input" type='text' {...props.input}/>{touched && error && <span>{error}</span>}</div>
};

export const renderFormInput = (name: string, formName: string, validators?: Function[]) => {
    return (
      <div>
        <label>{name}</label>
        <Field name={formName} component={formInput} type="text" validate={validators}/>
      </div>
    )
};