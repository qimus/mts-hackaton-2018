import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    Pagination,
    Header
} from 'semantic-ui-react'

import TableBody from './body'

export default class SmartTable extends Component {

    static defaultProps = {
        columns: []
    };

    state = { activePage: 1};

    handlePaginationChange = (e, { activePage }) => {
        if (this.props.onPageChange) {
            this.props.onPageChange(activePage);
        }
        this.props.provider.setActivePage(activePage);
        this.setState({ activePage });
    };

    render() {

        const { columns, header, provider } = this.props;

        return (
            <div>
                {header && <Header as='h3' textAlign='center'>{header}</Header>}

                <Table celled color='teal' striped>
                    <Table.Header>
                        <Table.Row>
                            {columns.map((item, i) => {
                                return <Table.HeaderCell key={i}>{item.title || ''}</Table.HeaderCell>
                            })}
                        </Table.Row>
                    </Table.Header>
                    <TableBody provider={provider} columns={columns} activePage={this.state.activePage}/>
                </Table>
                {provider.getTotalCount() > provider.getPerPage() && (
                    <Pagination totalPages={provider.getTotalPages()}
                                activePage={provider.getActivePage()}
                                onPageChange={this.handlePaginationChange}/>
                )}
            </div>
        )
    }
}

SmartTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            type: PropTypes.string,
            field: PropTypes.string,
            value: PropTypes.any
        })
    ),
    header: PropTypes.string,
    onPageChange: PropTypes.func,
    provider: PropTypes.object.isRequired
};