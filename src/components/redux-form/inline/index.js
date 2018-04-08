import React, { Component } from 'react'
import {
    Grid
} from 'semantic-ui-react'

export default function inline(Wrapped) {
    return class extends Component {
        render() {
            const { label, labelWidth = 5, labelAlign = 'middle', ...rest } = this.props;

            const fieldWidth = 16 - labelWidth;

            return (
                <Grid.Row>
                    <Grid columns={2} verticalAlign={labelAlign}>
                        <Grid.Column width={labelWidth} textAlign={'right'}>
                            <label>{label}</label>
                        </Grid.Column>
                        <Grid.Column width={fieldWidth} textAlign={'left'}>
                            <Wrapped {...rest}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            )
        }
    }
}