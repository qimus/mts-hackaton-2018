import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.min.css'
import classnames from 'classnames'
import {
    Form
} from 'semantic-ui-react'
import './style.scss';

import { DATE_FORMAT } from 'constants/app'
import InfoIcon from 'components/redux-form/common/info-icon'

const ReadonlyInput = ({ value, label, readonly = false }) => {
    return (
        <Form.Input value={value} readOnly={readonly} placeholder={label}/>
    )
};

const style = {
    field: {
        position: 'relative',
        paddingRight: 10
    },
    icon: {
        position: 'absolute',
        top: '25%'
    }
};

const MyDatePicker = ({
                            label,
                            meta: { error = '', touched = false },
                            input,
                            readonly = false,
                            pickerOptions = {},
                            dateFormat = DATE_FORMAT,
                            timeFormat,
                            timeIntervals,
                            isEdited = false,
                            showTimeSelect = false
                        }) => {

    function onChange(date) {
        input.onChange(moment(date).format(dateFormat + (timeFormat ? ' ' + timeFormat : '')))
    }

    if (readonly) {
        pickerOptions['customInput'] = <ReadonlyInput label={label} readonly/>;
    }

    if (showTimeSelect) {
        pickerOptions.showTimeSelect = true;
        pickerOptions.timeFormat = timeFormat;
        pickerOptions.timeIntervals = timeIntervals;
    }

    return (
        <Form.Field style={style.field}>
            <label>{label}</label>

            <DatePicker locale='ru'
                        {...input}
                        calendarClassName='disabled'
                        onChange={onChange}
                        selected={input.value ? moment(input.value, dateFormat + (timeFormat ? ' ' + timeFormat : '')) : null}
                        dateFormat={DATE_FORMAT}
                        {...pickerOptions}/>
            {touched && error && <InfoIcon item={error} style={style.icon}/>}
        </Form.Field>
    )
};

export default MyDatePicker;