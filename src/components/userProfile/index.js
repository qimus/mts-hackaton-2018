import React, { Component } from 'react'
import UserAvatar from "./avatar";
import classnames from "classnames";
import "./style.scss"
import UserInfo from "./info";
import UserSpecialization from "./specialization";
import UserAchievement from "./achievement";

class UserProfile extends Component {
    render() {
        return (
            <div className={classnames('profile', 'ui grid')}>
                <div className="row">
                    <div className={classnames("column four wide stretched segment", "avatar")}>
                        <UserAvatar url={this.props.user.avatar_url} />
                    </div>
                    <div className={classnames("column eight wide segment", "user-info")}>
                        <UserInfo {...this.props.user} currentUser={this.props.currentUser} />
                        {this.props.user.type.id != 2 && (
                            <UserSpecialization collection={this.props.user.specializations} canAdd={this.props.currentUser} />
                        )}
                        <UserAchievement collection={this.props.user.achievements} />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;