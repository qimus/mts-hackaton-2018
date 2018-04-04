import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field } from 'redux-form'
import { connect } from 'react-redux'

import {
    Button,
    Table,
    Icon
} from 'semantic-ui-react'

const isEditable = ({ input }) => {

    const value = input.value || 0;
    return (
        <Button basic icon size='tiny' color={value ? 'blue' : 'green'} floated='left'
                onClick={() => {
                    input.onChange(!input.value);
                }
                }>
            <Icon name={value ? 'checkmark' : 'edit'}/>
        </Button>
    )
};

isEditable.propTypes = {
    input: PropTypes.object
};


class EditableGrid extends Component {

    renderRows = () => {
        const { columns, fields, canEdit = true } = this.props;

        return (
            <Table.Body>
                {
                    fields.map((item, index) => {

                            let row = fields.get(index);
                            let disabled = row.isEditable ? false : true;

                            return (
                                <Table.Row>
                                    {columns.map(
                                        (column) => (
                                            <Table.Cell>
                                                <Field
                                                    component={disabled ? column.disabledComponent : column.editingComponent}
                                                    name={`${item}.${column.fieldName}`}
                                                    {...column.props}
                                                    handleResultSelect={(value) => {
                                                        if (typeof column.props.handleResultSelect === 'function') {
                                                            column.props.handleResultSelect(value, index);
                                                        }
                                                    }}
                                                    handleChange={(value) => {
                                                        if (typeof column.props.handleChange === 'function') {
                                                            column.props.handleChange(value, index);
                                                        }
                                                    }}
                                                />
                                            </Table.Cell>
                                        )
                                    )}
                                    {canEdit &&
                                    <Table.Cell>
                                        <Field component={isEditable} name={`${item}.isEditable`}/>
                                    </Table.Cell>
                                    }
                                    {canEdit &&
                                    <Table.Cell>
                                        <Button basic icon size='tiny' color='red' floated='right'
                                                onClick={() => fields.remove(index)}>
                                            <Icon name='remove'/>
                                        </Button>
                                    </Table.Cell>
                                    }

                                </Table.Row>
                            )
                        }
                    )
                }
            </Table.Body>
        );
    }

    render() {
        const { columns, canEdit = true } = this.props;

        return (
            <Table celled padded size='small'>
                <Table.Header>
                    <Table.Row>
                        {columns.map((item) => (
                            <Table.HeaderCell>{item.title}</Table.HeaderCell>
                        ))}
                        {canEdit && <Table.HeaderCell></Table.HeaderCell>}
                        {canEdit && <Table.HeaderCell></Table.HeaderCell>}
                    </Table.Row>
                </Table.Header>
                {this.renderRows()}

                {canEdit &&
                <Button style={{ margin: 15 }} icon floated='left' labelPosition='left' primary size='small'
                        onClick={() => {
                            this.props.fields.push({ 'isEditable': true })
                        }}>
                    <Icon name='add'/>
                    Добавить
                </Button>
                }

            </Table>
        )
    }
}

EditableGrid.propTypes = {
    fields: PropTypes.object,
    columns: PropTypes.array,
    canEdit: PropTypes.bool
};

export default connect(null, null)(EditableGrid);

export const SimpleText = ({ input }) => {
    return <span>{input.value}</span>
};

SimpleText.propTypes = {
    input: PropTypes.object
};