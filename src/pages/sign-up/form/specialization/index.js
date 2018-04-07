import React from 'react'
import classnames from 'classnames'
import {
    Checkbox,
    Header,
    Table
} from 'semantic-ui-react'


const Specializations = ({ input, items = []}) => {

    let cells = [], rows = [];

    items.forEach((item, i) => {

        const handleChange = (event) => {
            const newValue = [...input.value];
            if (event.target.checked) {
                newValue.push(item.id);
            } else {
                newValue.splice(newValue.indexOf(item.id), 1);
            }

            return input.onChange(newValue);
        };

        let name = `${input.name}[${item.id}]`;
        cells.push(
            <Table.Cell>
                <Header as={'h4'} image style={{marginTop: 10}}>
                    <label>
                        <Checkbox
                            {...input}
                            onChange={handleChange}
                            onBlur={() => {}}
                            name={name}
                            value={item.id}
                            style={{marginRight: 5, paddingRight: 5}}
                        />
                        <Header.Content style={{paddingRight: 5}}>
                            {item.name}
                        </Header.Content>
                    </label>
                </Header>
                <div className={classnames('specialization', item.icon)} style={{float: 'right'}}></div>
            </Table.Cell>
        );

        if (i % 2) {
            rows.push(<Table.Row>{cells}</Table.Row>);
            cells = [];
        }
    });

    return (
        <Table basic={'very'} celled collapsing>
            <Table.Body>
                {rows}
            </Table.Body>
        </Table>
    )
};

export default Specializations;