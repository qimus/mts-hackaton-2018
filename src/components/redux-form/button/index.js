import React from 'react'
import PropTypes from 'prop-types'
import {
    Button
} from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

export default function FormButton({ title, options = {}}) {
    return (
        <Button {...options}>{title}</Button>
    )
}

if (process.env.NODE_ENV === DEV_ENV) {
    FormButton.propTypes = {
        options: PropTypes.object,
        title: PropTypes.string
    };
}