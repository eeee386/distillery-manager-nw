import * as React from 'react'
import { Field } from 'redux-form';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './renderDatePicker.scss';

interface DatePickerProps {input: {onChange: Function, value: string}, meta: {touched: boolean, error: boolean}}

class renderDatePicker extends React.Component<DatePickerProps> {

    handleChange = (date: Date) => {
        this.props.input.onChange(date.toISOString().slice(0, 10))
    };

    render () {
        const {
            input,
            meta: {touched, error}
        } = this.props;

        return (
            <div>
                <DatePicker
                    {...input}
                    dateFormat="YYYY-MM-dd"
                    selected={input.value ? new Date(input.value) : null}
                    onChange={this.handleChange}
                />
                {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

export const renderDatePickerField = (name: string, formName: string) => (
    <div>
        <label>{name}</label>
        <Field name={formName} component={renderDatePicker} type="text" />
    </div>
);