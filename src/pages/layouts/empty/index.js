import React, { Component } from 'react'
import {
    Grid,
} from 'semantic-ui-react'

export default class EmptyLayout extends Component {
    render() {
        return (
            <Grid textAlign={'center'} verticalAlign={'middle'}>
                <Grid.Column>
                    {this.props.children}
                </Grid.Column>
            </Grid>
        )
    }
}
