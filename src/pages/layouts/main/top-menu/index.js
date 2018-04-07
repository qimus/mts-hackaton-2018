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

@withRouter
class TopMenu extends Component {
    state = { activeItem: 'home' };

    componentDidMount() {
        this.props.getUser(localStorage.getItem('USER_ID'));
    }

    routeTo(path) {
        console.log(path);
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

    render() {
        const { activeItem } = this.state;
        const { user } = this.props;

        return (
            <Menu size='small' color={'black'} inverted>
                <Menu.Item name='home' active={activeItem === 'home'} onClick={this.routeTo.bind(this, '/')}>
                    <img src={logo} />
                </Menu.Item>
                {/*<Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />*/}

                <Menu.Menu position='right'>
                    <Menu.Item onClick={this.handleLogin}>
                        <Button primary>{user.id > 0 ? 'Выйти' : 'Войти'}</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu)