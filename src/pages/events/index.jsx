import React, { Component } from 'react'

// ui
import {
 Header
} from 'semantic-ui-react';

import EventsContainer from './container';

export default class EventsPage extends Component {
    render() {
        return (
            <div>
                <Header as={'h1'} dividing={true}>События и акции</Header>
                <EventsContainer/>
            </div>
        )
    }
}