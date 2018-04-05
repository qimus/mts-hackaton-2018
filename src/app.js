import React, { Component } from 'react'
import LoginPage from 'pages/login'
import { Provider } from 'react-redux'

export default class App extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <LoginPage/>
            </Provider>
        )
    }
}

