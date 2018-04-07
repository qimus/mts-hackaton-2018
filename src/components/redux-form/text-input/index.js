import React from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Icon
} from 'semantic-ui-react'

import InfoIcon from 'components/redux-form/common/info-icon'

const TextInput = ({
       label,
       placeholder, help, meta = {}, input, readonly, disabled, horizontal = false, valueExpr, schema, isEdited = false, type = 'text', icon
}) => {

    let extra = {};
    const { touched = false, error = '' } = meta;

    if (readonly) {
        extra['readOnly'] = true;
    }

    if (disabled) {
        extra['disabled'] = true;
    }

    if (icon) {
        return (
            <Form.Field style={{position: 'relative', paddingRight: 10}} error={touched && error}>
                <div className="ui left icon input">
                    <Icon name={icon}/>
                    <input
                        {...input}
                        {...extra}
                        type={type}
                        placeholder={placeholder} />
                </div>
                {touched && error && <InfoIcon item={error} style={{position: 'absolute', top: '25%'}}/>}
            </Form.Field>
        )
    } else {
        return (
            <Form.Field style={{position: 'relative', paddingRight: 10}} error={touched && error}>
                {label && <label>{label}</label>}
                <input
                    {...input}
                    {...extra}
                    type={type}
                    placeholder={placeholder} />
                {touched && error && <InfoIcon item={error} style={{position: 'absolute', top: '25%'}}/>}
            </Form.Field>
        )
    }
};

TextInput.propTypes = {
    label: PropTypes.string,
    help: PropTypes.string,
    meta: PropTypes.shape({
        touched: PropTypes.bool,
        error: PropTypes.oneOfType(
            PropTypes.bool,
            PropTypes.string
        )
    }),
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    horizontal: PropTypes.bool,
    input: PropTypes.object,
    valueExpr: PropTypes.string,
    schema: PropTypes.object,
    isEdited: PropTypes.bool
};

export default TextInput;