import React from 'react'
import PropTypes from 'prop-types'
import {
    Form,
    Radio
} from 'semantic-ui-react'

import LabelExt from 'workflow/components/label-ext'
import { DEV_ENV } from 'workflow/constants/app'

const RadioGroup = ({ input, meta: { touched, error }, items, defaultValue, readonly = false, title = '' }) => {

    let header;

    if (title) {
        header = (
            <LabelExt path={input.name}>
                {title}
            </LabelExt>
        )
    }

    return (
        <div>
            {header}
            {items.map((item, i) => {
                let itemOptions = {};
                if ((input.value === '' || input.value === null) && defaultValue !== undefined && item.value == defaultValue) {
                    itemOptions[ 'checked' ] = true;
                } else if (item.value == input.value) {
                    itemOptions[ 'checked' ] = true;
                }

                return (
                    <Form.Field key={i}>
                        <Radio {...input}
                               value={item.value}
                               label={item.name}
                               readOnly={readonly}
                               disabled={!readonly}
                               {...itemOptions} />
                    </Form.Field>
                )
            })}
        </div>
    )
};

if (process.env.NODE_ENV === DEV_ENV) {
    RadioGroup.propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                value: PropTypes.any.isRequired
            })
        ),
        defaultValue: PropTypes.any,
        input: PropTypes.object,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        }),
        readonly: PropTypes.bool,
        title: PropTypes.string
    };
}

export default RadioGroup;