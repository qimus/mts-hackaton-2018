import React, { Component } from 'react'
import {
    Grid
} from 'semantic-ui-react'

export default function inline(Wrapped) {
    return class extends Component {
        render() {
            const { label, ...rest } = this.props;

            return (
                <Grid.Row>
                    <Grid columns={2} verticalAlign={'middle'}>
                        <Grid.Column width={5} textAlign={'right'}>
                            <label>{label}</label>
                        </Grid.Column>
                        <Grid.Column width={11} textAlign={'right'}>
                            <Wrapped {...rest}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
            )
        }
    }
}