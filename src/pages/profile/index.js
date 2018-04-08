import React, { Component } from 'react'
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UserAvatar from "./avatar";
import classnames from "classnames";
import "./style.scss"
import UserInfo from "./info";
import UserSpecialization from "./specialization";

class Profile extends Component {

    render() {
        return (
            <div className={classnames('profile', 'ui grid')}>
                <div className="row">
                    <div className={classnames("column four wide stretched segment", "avatar")}>
                        <UserAvatar url={this.props.user.avatar_url} />
                    </div>
                    <div className={classnames("column eight wide segment", "user-info")}>
                        <UserInfo {...this.props.user} />
                        {this.props.user.type.id != 2 && (
                            <UserSpecialization collection={this.props.user.specializations} />
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps, {})(Profile))