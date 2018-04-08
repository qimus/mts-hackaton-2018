import React from "react";
import defaultAvatar from 'resource/no_avatar.png'
import classnames from "classnames";

const UserParameter = (props) => {
    return (
        <div className={classnames("row", "property")}>
            <div className={classnames("four wide column", "label")}>
                <strong>{props.label}</strong>
            </div>
            <div className={classnames("four wide column", "value")}>
                {props.value}
            </div>
        </div>

    );
};

export default UserParameter;