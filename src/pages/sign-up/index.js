import React, { Component } from 'react'
import SignUpForm from './form'
import {
    Grid
} from 'semantic-ui-react'

export default class SignUpPage extends Component {
    render() {
        return (
            <Grid.Column textAlign={'center'} verticalAlign={'middle'} width={10}>
                <SignUpForm/>
            </Grid.Column>
        )
    }
}