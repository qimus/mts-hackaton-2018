import React from "react";
import classnames from "classnames";
import {
    Header,
    Table
} from 'semantic-ui-react'


const UserSpecialization = (props) => {

    const specializations = props.collection.map( item => {
        return (
            <div className={classnames("five wide column")}>
                <div className={classnames('specialization', item.icon)} style={{float: "left"}}></div>
                <div className={classnames("label")}>
                    {item.name}
                </div>
            </div>
        )
    });

    const addSpecialization = (
        <div className={classnames("five wide column add")}>
            <div className={classnames('specialization', "new")} style={{float: "left"}}></div>
            <div className={classnames("label")}>
                Добавить специализацию
            </div>
        </div>
    );

    return (
        <div className={classnames("ui blue segment")}>
            <div className={classnames("ui grid specializations")}>
                {specializations}
                {addSpecialization}
            </div>
        </div>
    )
};

export default UserSpecialization;