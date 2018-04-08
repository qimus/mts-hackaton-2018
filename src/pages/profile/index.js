import React, { Component } from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UserProfile from "../../components/userProfile";

class Profile extends Component {
    render() {
        return (
            <UserProfile user={this.props.user} currentUser={true}/>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps, {})(Profile))