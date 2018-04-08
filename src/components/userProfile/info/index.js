import React from "react";
import classnames from "classnames";
import marker from "resource/marker.png";
import UserParameter from "./parameter";
import UserProgress from "./progress";

const UserInfo = (props) => {
    const parameters = [
        <UserParameter label={"E-mail"} value={props.login}/>,
        <UserParameter label={"Телефон"} value={props.phone}/>,
        <UserParameter label={"Тип пользователя"} value={props.type.name}/>,
    ];

    return (
        <div className={classnames('ui grid segment')}>
            <div className={classnames("header row")}>
                <div
                    className={classnames(
                        "name",
                        "left floated six wide column"
                    )}
                    style={{paddingTop: "5px"}}
                >
                    {props.name}
                </div>
                <div className={classnames(
                        "city",
                        "right aligned six wide column"
                )}>
                <img src={marker} style={{verticalAlign: "middle"}} /> {props.city.name}
                </div>
            </div>
            <div className={classnames("row")}>
                <div className={classnames("twelve wide column")}>
                    {parameters}
                </div>
                <div className={classnames("four wide column")}>
                    <UserProgress {...props}/>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;