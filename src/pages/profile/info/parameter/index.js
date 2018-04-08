import React from "react";
import defaultAvatar from 'resource/no_avatar.png'
import classnames from "classnames";

const UserParameter = (props) => {
    return (
        <div className={classnames("ui grid", "property")}>
            <div className={classnames("eight wide column", "label")}>
                <strong>{props.label}</strong>
            </div>
            <div className={classnames("eight wide column", "value")}>
                {props.value}
            </div>
        </div>

    );
};

export default UserParameter;