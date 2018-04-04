import React from 'react'//eslint-disable-line
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

const WorkingDivider = ({children, ...rest}) => {
    let containerStyle = {position: 'relative', margin: 0, padding: 0};

    return (
        <div style={containerStyle}>
            <Divider {...rest}>{children}</Divider>
        </div>
    )
};

if (process.env.NODE_ENV === DEV_ENV) {
    WorkingDivider.propTypes = {
        children: PropTypes.string
    };
}

export default WorkingDivider;