import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UserProfile from "../../components/userProfile";
import {
    getProfileUser
} from 'actions/users'

class Profiles extends Component {

    async componentWillMount() {
        await this.props.getProfileUser({id:this.props.match.params.id});
    }

    render() {

        const { users: { result } = {}} = this.props;

        if (result && result.length > 0) {
            return <UserProfile user={result[0]} />
        }

        return <div></div>
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users
});

const mapDispatchToProps = (dispatch) => ({
    getProfileUser: bindActionCreators(getProfileUser, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profiles))