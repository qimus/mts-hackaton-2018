import React from 'react'

import {
    TextArea,
    Form
} from 'semantic-ui-react'
import classnames from 'classnames'


const TextAreaInput = ({ input, label, meta: {touched = false, error = ''} = {}, readonly = false, isEdited = false}) => {

    const hasError = touched && error !== '';

    return (
        <Form.Field error={hasError} className={classnames({'edited-field': isEdited})}>
            <label>{label}</label>
            <TextArea {...input} placeholder={label} readOnly={readonly}/>
            {hasError && (
                <span className='field-error'>{error}</span>
            )}
        </Form.Field>
    );
};


export default TextAreaInput;