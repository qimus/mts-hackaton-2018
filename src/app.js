import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
    createBrowserHistory
} from 'history'
import {
    Route,
    Router,
    Switch,
    Redirect
} from 'react-router'

import auth from 'utils/auth'

//layouts
import EmptyLayout from 'pages/layouts/empty'

//pages
import LoginPage from 'pages/login'
import ProfilePage from 'pages/profile'
import MainPage from 'pages/main'
import NotFound from 'pages/404'

const RouteWithLayout = ({layout:Layout, page:component, secure = false, ...rest}) => {
    return (
        <Route {...rest} render={(props) => {
            if (secure && !auth.isLoggedIn()) {
                return <Redirect to={{
                    pathname: '/login'
                }}/>
            }

            return (
                <Layout {...props}>
                    {React.createElement(component, props)}
                </Layout>
            )
        }}/>
    )
};


export const history = createBrowserHistory();

export default class App extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <Router history={history}>
                    <Switch>
                        <RouteWithLayout exact layout={EmptyLayout} path={'/'} page={MainPage}/>
                        <RouteWithLayout exact layout={EmptyLayout} path={'/login'} page={LoginPage}/>
                        <RouteWithLayout exact secure layout={EmptyLayout} path={'/profile'} page={ProfilePage}/>
                        <Route component={NotFound} path={'*'}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

