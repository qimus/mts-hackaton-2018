import React from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Icon
} from 'semantic-ui-react'

import InfoIcon from 'components/redux-form/common/info-icon'

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

const TextInput = ({
       label,
       placeholder, help, meta = {}, input, inline = false, readonly, disabled, horizontal = false, valueExpr, schema, isEdited = false, type = 'text', icon
}) => {

    let extra = {};
    const { touched = false, error = '' } = meta;

    if (readonly) {
        extra['readonly'] = true;
    }

    if (disabled) {
        extra['disabled'] = true;
    }

    if (icon) {
        return (
            <Form.Field style={style.field} inline={inline} error={touched && error}>
                {label && <label>{label}</label>}
                <div className="ui left icon input">
                    <Icon name={icon}/>
                    <input
                        {...input}
                        {...extra}
                        type={type}
                        placeholder={placeholder} />
                </div>
                {touched && error && <InfoIcon item={error} style={style.icon}/>}
            </Form.Field>
        )
    } else {
        return (
            <Form.Field style={style.field} inline={inline} error={touched && error}>
                {label && <label>{label}</label>}
                <input
                    {...input}
                    {...extra}
                    type={type}
                    placeholder={placeholder} />
                {touched && error && <InfoIcon item={error} style={style.icon}/>}
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