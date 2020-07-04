import * as React from 'react'
import {Form, reduxForm, InjectedFormProps} from 'redux-form';
import './TableForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {renderDatePickerField} from "../../UtilComponents/renderDatePicker";
import {Validators} from "../../../utils/validators";
import {Distillation} from "../../../models/Distillation/Distillation";

const TABLE_FORM_NAME = 'TABLE_FORM';


class TableForm extends React.Component<InjectedFormProps<Distillation, any, any>> {
    constructor(props: InjectedFormProps<Distillation, any, any>) {
        super(props);
        console.log(props.initialValues)
    }

    render() {
        return (
            <Form onSubmit={this.props.handleSubmit}>
                <div className={"root"}>
                    {renderDatePickerField('Dátum', 'date')}
                    {renderFormInput('Név', 'name', [Validators.required])}
                    {renderFormInput('Lakcím', 'address')}
                    {renderFormInput('AdóSzám', 'taxID', [Validators.TaxIDLength])}
                    {renderFormInput('Származási Igazolvány Szám', 'originID')}
                    {renderFormInput('Hektoliterfok', 'HLF')}
                    {renderFormInput('Tömeg', 'weightInKilograms')}
                    <button className={"button is-success"} onClick={this.props.handleSubmit}>Mentés</button>
                </div>
            </Form>
        )
    }
}

export default reduxForm({
    form: TABLE_FORM_NAME,
})(TableForm)