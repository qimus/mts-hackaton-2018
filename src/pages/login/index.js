import React, { Component } from 'react'
import {
    Grid
} from 'semantic-ui-react'

import LoginForm from './form'

export default class LoginPage extends Component {
    render() {
        return (
            <Grid.Column textAlign={'center'} verticalAlign={'middle'} width={5}>
                <LoginForm/>
            </Grid.Column>
        )
    }
}
