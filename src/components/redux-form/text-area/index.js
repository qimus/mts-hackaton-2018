import React from 'react'
import PropTypes from 'prop-types'
import {
    TextArea,
    Form
} from 'semantic-ui-react'
import classnames from 'classnames'

import LabelExt from 'workflow/components/label-ext'
import { DEV_ENV } from 'workflow/constants/app'

const TextAreaInput = ({ input, label, meta: {touched = false, error = ''} = {}, readonly = false, isEdited = false}) => {

    const hasError = touched && error !== '';

    return (
        <Form.Field error={hasError} className={classnames({'edited-field': isEdited})}>
            <LabelExt path={input.name}>{label}</LabelExt>
            <TextArea {...input} placeholder={label} readOnly={readonly}/>
            {hasError && (
                <span className='field-error'>{error}</span>
            )}
        </Form.Field>
    );
};

if (process.env.NODE_ENV === DEV_ENV) {
    TextAreaInput.propTypes = {
        input: PropTypes.object,
        label: PropTypes.string,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        }),
        readonly: PropTypes.bool,
        isEdited: PropTypes.bool
    };
}

export default TextAreaInput;