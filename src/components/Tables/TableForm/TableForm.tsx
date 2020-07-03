import * as React from 'react'
import {Form, reduxForm, InjectedFormProps} from 'redux-form';
import './TableForm.scss';
import {renderFormInput} from '../../UtilComponents/renderFormInput'
import {renderDatePickerField} from "../../UtilComponents/renderDatePicker";
import {Validators} from "../../../utils/validators";
import { Distillation } from '../../../models/Distillation/Distillation';
import {StateProps} from "../../../models/ConnectTypes/ConnectTypes";
import {payloadNames} from "../../../models/Types/TableTypes/TableTypes";
import {connect} from "react-redux";

const TABLE_FORM_NAME = 'TABLE_FORM';


class TableForm extends React.Component<InjectedFormProps<any, any, any> & {table: Distillation[]}> {
    constructor(props: InjectedFormProps<any, any, any> & {table: Distillation[]}) {
      super(props);
      if(props.table){
          const data = props.table.find((d: Distillation) => props.form.split('_')[1] === d._id.toString())
        if(data) {
            props.initialize(data.toObject());
        }
      }
    }
    render(){
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

const mapStateToProps = (state: StateProps) => ({
    table: state.tables[payloadNames.TABLES],
});

export default reduxForm({
    form: TABLE_FORM_NAME,
    //@ts-ignore
})(connect(mapStateToProps, null)(TableForm))