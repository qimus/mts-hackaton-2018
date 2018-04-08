import React, { Component } from 'react'

// ui
import {
    Header
} from 'semantic-ui-react';

import OrganizationsContainer from './../organizations/container';

export default class SponsorsPage extends Component {
    render() {
        return (
            <div>
                <Header as={'h1'} dividing={true}>Спонсоры</Header>
                <OrganizationsContainer isSponsor={true} />
            </div>
        )
    }
}