import React, { Component } from 'react'

import {
    Grid
} from 'semantic-ui-react'

import TopMenu from './top-menu'

const contentStyle = {
    padding: '12px 24px'
};

export default class MainLayout extends Component {
    render() {
        return (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <TopMenu/>
                    </Grid.Column>
                    <Grid.Column width={16} style={contentStyle}>
                        {this.props.children}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}
