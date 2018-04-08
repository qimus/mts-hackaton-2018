import React from "react";
import classnames from "classnames";
import marker from "resource/marker.png";

const UserInfo = (props) => {
    return (
        <div className={classnames('ui segment')}>
            <div className={classnames("header block")}>
                <span className={classnames("name")}>{props.name}</span>
                <div className={classnames("city")} style={{float: "right"}}>
                    <img src={marker} style={{verticalAlign: "middle"}} /> {props.city.name}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;