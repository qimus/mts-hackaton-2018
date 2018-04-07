import React from 'react'
import {
    Checkbox
} from 'semantic-ui-react'

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

export default CheckboxControl;