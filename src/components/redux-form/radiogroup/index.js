import React from 'react'
import {
    Form,
    Radio
} from 'semantic-ui-react'

const RadioGroup = ({ input, meta: { touched, error }, items, defaultValue, title = '' }) => {

    let header;

    if (title) {
        header = (<label>{title}</label>)
    }

    return (
        <div>
            {header}
            {items.map((item, i) => {
                let itemOptions = {};
                if ((input.value === '' || input.value === null) && defaultValue !== undefined && item.value === defaultValue) {
                    itemOptions[ 'checked' ] = true;
                } else if (item.value == input.value) {
                    itemOptions[ 'checked' ] = true;
                }

                return (
                    <Form.Field key={i}>
                        <Radio {...input}
                               value={item.value}
                               label={item.name}
                               {...itemOptions} />
                    </Form.Field>
                )
            })}
        </div>
    )
};

export default RadioGroup;