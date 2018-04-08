import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    Grid,
    Segment,
    Dimmer,
    Loader
} from 'semantic-ui-react'

import TopMenu from './top-menu'

class MainLayout extends Component {
    render() {

        const { user } = this.props;
        const { isFetching = false } = user;
        let content;

        if (user.id !== undefined) {
            content = this.props.children;
        } else {
            content = (
                <Segment>
                    <Dimmer active>
                        <Loader />
                    </Dimmer>
                </Segment>
            )
        }

        return (
            <Grid >
                <Grid.Row>
                    <Grid.Column width={16}>
                        <TopMenu/>
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {content}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(MainLayout)