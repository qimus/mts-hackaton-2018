import React from 'react'
import PropTypes from 'prop-types'
import {
    Input,
    Grid,
    Form,
    Popup,
    Icon
} from 'semantic-ui-react'
import evaluateExpression from 'form-builder/lib/evaluate'
import classnames from 'classnames'

import LabelExt from 'workflow/components/label-ext'
import { DEV_ENV } from 'workflow/constants/app'

const TextInput = ({
       label, help, meta = {}, input, readonly, disabled, horizontal = false, valueExpr, schema, isEdited = false, ...rest
}) => {

    let extra = {};
    const {touched = false, error = ''} = meta;

    if (readonly) {
        extra['readOnly'] = true;
    }

    if (disabled) {
        extra['disabled'] = true;
    }

    if (touched && error) {
        extra['error'] = true;
    }

    if (valueExpr) {
        let val = evaluateExpression(valueExpr, schema, rest);
        if (val !== undefined && !isNaN(val)) {
            input.value = val;
        }
    }

    let lastCols = 9;

    if (rest.unit || rest.note) {
        lastCols = 7;
    }

    if (horizontal) {
        return (
            <Grid columns={2}>
                <Grid.Column width={3} verticalAlign='middle'>
                    <LabelExt path={input.name}>{label}</LabelExt>
                </Grid.Column>
                <Grid.Column width={lastCols}>
                    <Input {...extra}
                           {...input}
                           className={classnames({'edited-field': isEdited})}
                           type='text'
                           placeholder={label}
                           style={{width: '100%'}}/>
                </Grid.Column>
                {lastCols < 9 && (
                    <Grid.Column width={2}>
                        {rest.unit}
                        {rest.note && (
                            <Popup
                                trigger={<Icon name={'questing'} />}
                                content={rest.note}
                            />
                        )}
                    </Grid.Column>
                )}
            </Grid>
        )
    }

    return (
        <Form.Input {...extra}
                    {...input}
                    type='text'
                    className={classnames({'edited-field': isEdited})}
                    label={<LabelExt path={input.name}>{label}</LabelExt>}
                    placeholder={label}/>
    )
};

if (process.env.NODE_ENV === DEV_ENV) {
    TextInput.propTypes = {
        label: PropTypes.string,
        help: PropTypes.string,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string
        }),
        readonly: PropTypes.bool,
        disabled: PropTypes.bool,
        horizontal: PropTypes.bool,
        input: PropTypes.object,
        valueExpr: PropTypes.string,
        schema: PropTypes.object,
        isEdited: PropTypes.bool
    };
}

export default TextInput;