import React from 'react'
import { Progress } from 'semantic-ui-react'

const UserProgress = (props) => {
    const max = props.level.max_experience || props.experience;
    const percent = props.experience / max * 100;
    return (
        <div>
            <h3>{props.level.name} уровень</h3>
            <Progress percent={percent}>{props.experience}/{max}</Progress>
        </div>
    )
};

export default UserProgress