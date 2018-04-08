import React from "react";
import defaultAvatar from 'resource/no_avatar.png'

const UserAvatar = (props) => {
    return (
        <div className="ui segment">
            <img src={props.url || defaultAvatar} width="100%" height="100%"/>
        </div>
    );
};

export default UserAvatar;