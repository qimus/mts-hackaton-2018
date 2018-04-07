import React, { Component } from 'react'

import {
    Grid
} from 'semantic-ui-react'

import TopMenu from './top-menu'

export default class MainLayout extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <TopMenu/>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
