import React from 'react'
import PropTypes from 'prop-types'
import {
    Checkbox
} from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

const CheckboxControl = ({ input, label, meta: { touch = false, error = '' }, readonly, inline = true }) => {

    const onChange = (e, value) => {
        input.onChange(value.checked);

    };

    if (inline) {
        return (
            <Checkbox {...input} onChange={onChange} label={label} readOnly={readonly} checked={!!input.value}/>
        )
    }

    return (
        <div style={{marginTop: 10}}>
            <Checkbox {...input} onChange={onChange} label={label} readOnly={readonly} checked={!!input.value}/>
        </div>
    )
};

if (process.env.NODE_ENV === DEV_ENV) {
    CheckboxControl.propTypes = {
        input: PropTypes.object,
        label: PropTypes.string,
        meta: PropTypes.shape({
            touch: PropTypes.bool,
            error: PropTypes.string
        }),
        readonly: PropTypes.bool,
        inline: PropTypes.bool
    };
}

export default CheckboxControl;