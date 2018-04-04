import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Table
} from 'semantic-ui-react'

import columnFactory from '../columns'

export default class TableBody extends PureComponent {
    render() {

        const { provider, columns } = this.props;

        return (
            <Table.Body>
                {provider.getItems().map((item, i) => {
                    let items = columns.map((column, j) => {
                        const { type, field, value } = column;
                        let columnValue;

                        if (value) {
                            if (typeof value === 'function') {
                                columnValue = value(item, i);
                            } else {
                                columnValue = value;
                            }
                        } else if (field) {
                            columnValue = item[field] || '';
                        }

                        let Column = columnFactory(type);

                        return <Column value={columnValue}
                                       provider={provider}
                                       numRow={i}
                                       key={`${provider.getActivePage()}.${i}.${j}`}/>
                    });

                    return <Table.Row key={i}>{items}</Table.Row>
                })}
            </Table.Body>
        )
    }
}

TableBody.propTypes = {
    provider: PropTypes.object.isRequired,
    columns: PropTypes.array,
    activePage: PropTypes.number
};