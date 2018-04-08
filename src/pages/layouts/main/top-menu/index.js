import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import {
    Menu,
    Button
} from 'semantic-ui-react'

import { getUser, logout } from 'actions/user'

import logo from 'resource/logo.png'

import {
    TYPE_ORG,
    TYPE_SPONSOR,
    TYPE_VOLUNTEER
} from 'constants/user'

const menuStyle = {
    borderRadius: 0
};

class TopMenu extends Component {
    state = { activeItem: 'home' };

    componentDidMount() {
        this.props.getUser(localStorage.getItem('USER_ID'));
    }

    routeTo(path) {
        this.props.history.push(path);
    };

    handleLogin = () => {
        const { user } = this.props;
        if (user.id > 0) {
            this.props.logout();
            this.routeTo('/')
        } else {
            this.routeTo('/sign-in');
        }
    };

    isActiveMenuItem = (name) => {
        const { location: { pathname } } = this.props;

        switch (name) {
            case 'home':
                return pathname === '/';
            case 'profile':
                return pathname === '/profile';
            case 'organizations':
                return pathname === '/organizations';
            case 'sponsors':
                return pathname === '/sponsors';
            case 'events':
                return pathname === '/events';
            case 'volunteers':
                return pathname === '/volunteers';
        }

        return false;
    };

    render() {
        const { user } = this.props;
        const isAuthorized = user.id > 0;

        return (
            <Menu size='small' color={'black'} inverted style={menuStyle}>
                <Menu.Item name='home' active={this.isActiveMenuItem('home')} onClick={this.routeTo.bind(this, '/')}>
                    <img src={logo} />
                </Menu.Item>

                <Menu.Item name='organizations' active={this.isActiveMenuItem('organizations')} onClick={this.routeTo.bind(this, '/organizations')}>
                    Оргагизации
                </Menu.Item>

                <Menu.Item name='sponsors' active={this.isActiveMenuItem('sponsors')} onClick={this.routeTo.bind(this, '/sponsors')}>
                    Спонсоры
                </Menu.Item>

                <Menu.Item name='events' active={this.isActiveMenuItem('events')} onClick={this.routeTo.bind(this, '/events')}>
                    События
                </Menu.Item>

                <Menu.Item name='volunteers' active={this.isActiveMenuItem('volunteers')} onClick={this.routeTo.bind(this, '/volunteers')}>
                    Волонтеры
                </Menu.Item>

                {user.type_id == TYPE_ORG && (
                    [
                        <Menu.Item name='add_event' active={this.isActiveMenuItem('add_event')} onClick={this.routeTo.bind(this, '/events/new')}>
                            Добавить событие
                        </Menu.Item>
                    ]
                )}

                <Menu.Menu position='right'>
                    {isAuthorized && (
                        [
                            <Menu.Item name='profile' active={this.isActiveMenuItem('profile')} onClick={this.routeTo.bind(this, '/profile')}>
                                Профиль
                            </Menu.Item>
                        ]
                    )}
                    <Menu.Item onClick={this.handleLogin}>
                        <Button primary>{isAuthorized ? 'Выйти' : 'Войти'}</Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    getUser: bindActionCreators(getUser, dispatch),
    logout: bindActionCreators(logout, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopMenu))