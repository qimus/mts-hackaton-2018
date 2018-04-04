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

//shape
import optionItemShape from 'workflow/constants/shapes/redux-form/option-item'
import metaShape from 'workflow/constants/shapes/redux-form/meta'

import { DATE_FORMAT, DEV_ENV } from 'workflow/constants/app'
import LabelExt from 'workflow/components/label-ext'
import InfoIcon from 'workflow/components/redux-form/common/info-icon'

const ReadonlyInput = ({ value, label, readonly = false }) => {
    return (
        <Form.Input value={value} readOnly={readonly} placeholder={label}/>
    )
};

ReadonlyInput.propTypes = {
    value: PropTypes.any,
    label: PropTypes.string,
    readonly: PropTypes.bool
};

const KedrDatePicker = ({
                            label,
                            meta: { error = '', touched = false },
                            input,
                            readonly = false,
                            pickerOptions = {},
                            dateFormat = DATE_FORMAT,
                            timeFormat,
                            timeInterval,
                            isEdited = false,
                            showTimeSelect = false,
                            inLine = false
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
        pickerOptions.timeIntervals = timeInterval;
    }

    return (
        <Form.Field className={classnames({ 'edited-field': isEdited })}>
            <LabelExt path={input.name} style={inLine ? { float: 'left', margin: 10 } : {}}>{label} {touched && error &&
            <InfoIcon item={error}/>}</LabelExt>

            <DatePicker locale='ru'
                        {...input}
                        calendarClassName='disabled'
                        onChange={onChange}
                        selected={input.value ? moment(input.value, dateFormat + (timeFormat ? ' ' + timeFormat : '')) : null}
                        dateFormat={DATE_FORMAT}
                        {...pickerOptions}/>
        </Form.Field>
    )
};

if (process.env.NODE_ENV === DEV_ENV) {
    KedrDatePicker.propTypes = {
        label: PropTypes.string,
        items: PropTypes.arrayOf(optionItemShape),
        help: PropTypes.string,
        meta: PropTypes.shape(metaShape),
        input: PropTypes.object.isRequired,
        dateFormat: PropTypes.string,
        labelClass: PropTypes.string,
        inputClass: PropTypes.string,
        containerStyle: PropTypes.string,
        readonly: PropTypes.bool,
        pickerOptions: PropTypes.object,
        timeFormat: PropTypes.string,
        timeInterval: PropTypes.number,
        showTimeSelect: PropTypes.bool,
        isEdited: PropTypes.bool,
        inLine: PropTypes.bool
    };
}

export default KedrDatePicker;