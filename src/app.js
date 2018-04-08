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
import MainLayout from 'pages/layouts/main'

//pages
import LoginPage from 'pages/login'
import ProfilePage from 'pages/profile'
import MainPage from 'pages/main'
import NotFound from 'pages/404'
import SignUpPage from 'pages/sign-up'
import EventsPage from 'pages/events/index'
import EventPage from 'pages/event/index'
import VolunteersPage from 'pages/volunteers'
import OrganizationsPage from 'pages/organizations'
import SponsorsPage from 'pages/sponsors'
import AddEventPage from 'pages/events/add'

const RouteWithLayout = ({layout:Layout, page:component, privacy = false, ...rest}) => {
    return (
        <Route {...rest} render={(props) => {
            if (privacy && !auth.isLoggedIn()) {
                return <Redirect to={{
                    pathname: '/sign-in'
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
                        <RouteWithLayout exact layout={MainLayout} path={'/'} page={MainPage}/>
                        <RouteWithLayout exact layout={MainLayout} path={'/events'} page={EventsPage}/>
                        <RouteWithLayout exact layout={MainLayout} path={'/events/:id'} page={EventPage}/>
                        <RouteWithLayout exact layout={MainLayout} path={'/events/new'} page={AddEventPage}/>
                        <RouteWithLayout exact layout={MainLayout} path={'/organizations'} page={OrganizationsPage}/>
                        <RouteWithLayout exact layout={MainLayout} path={'/sponsors'} page={SponsorsPage}/>
                        <RouteWithLayout exact layout={MainLayout} path={'/volunteers'} page={VolunteersPage}/>
                        <RouteWithLayout exact layout={EmptyLayout} path={'/sign-in'} page={LoginPage}/>
                        <RouteWithLayout exact layout={EmptyLayout} path={'/sign-up'} page={SignUpPage}/>
                        <RouteWithLayout exact privacy layout={MainLayout} path={'/profile'} page={ProfilePage}/>
                        <Route component={NotFound} path={'*'}/>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

