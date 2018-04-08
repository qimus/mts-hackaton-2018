import React, { Component } from 'react'
import {
    Header
} from 'semantic-ui-react'
import VolunteersContainer from './container'

export default class VolunteersPage extends Component {
    render() {
        return (
            <div>
                <Header as={'h1'} dividing={true}>Волонтеры</Header>
                <VolunteersContainer />
            </div>
        )
    }
}