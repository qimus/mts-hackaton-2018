import React from 'react'
import PropTypes from 'prop-types'
import {
    Table
} from 'semantic-ui-react'

const SimpleColumn = ({ value }) => {
    return (
        <Table.Cell>{value}</Table.Cell>
    )
};

export default SimpleColumn;

SimpleColumn.propTypes = {
    value: PropTypes.any,
    provider: PropTypes.object,
    numRow: PropTypes.number
};