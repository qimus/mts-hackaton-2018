import React from "react";
import classnames from "classnames";


const UserAchievement = (props) => {

    const achievements = (props.collection || []).map( item => {
        return (
            <div className={classnames("five wide column")}>
                <div className={classnames('achievement', item.icon)} style={{float: "left"}}></div>
                <div className={classnames("label")}>
                    {item.name}
                </div>
            </div>
        )
    });

    return (
        <div className={classnames("ui green segment")}>
            <div className={classnames("ui grid achievements")}>
                {achievements}
            </div>
        </div>
    )
};

export default UserAchievement;