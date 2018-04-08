import React, { Component } from 'react'

// ui
import {
    Header
} from 'semantic-ui-react';

import OrganizationsContainer from './container';

export default class OrganizationsPage extends Component {
    render() {
        return (
            <div>
                <Header as={'h1'} dividing={true}>Организации</Header>
                <OrganizationsContainer/>
            </div>
        )
    }
}