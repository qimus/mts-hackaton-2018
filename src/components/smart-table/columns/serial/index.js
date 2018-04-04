import React from 'react'
import PropTypes from 'prop-types'
import {
    Table
} from 'semantic-ui-react'

const SerialColumn = ({ numRow, provider }) => {
    return (
        <Table.Cell>{provider.getStartIndex() + numRow + 1}</Table.Cell>
    )
};

export default SerialColumn;

SerialColumn.propTypes = {
    value: PropTypes.any,
    provider: PropTypes.object,
    numRow: PropTypes.number
};