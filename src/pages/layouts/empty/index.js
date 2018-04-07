import React, { Component } from 'react'
import {
    Grid,
} from 'semantic-ui-react'

export default class EmptyLayout extends Component {
    render() {
        const { children } = this.props;

        return (
            <Grid textAlign={'center'} verticalAlign={'middle'}>
                <Grid.Row>
                    {children}
                </Grid.Row>
            </Grid>
        )
    }
}
