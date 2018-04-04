import React from 'react'
import PropTypes from 'prop-types'
import {
    Grid,
    Message,
    Icon,
    Button
} from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

const PanelHeader = ({label, isShow = true, onChange}) => {

    return (
        <Message attached style={{paddingBottom: 0, paddingTop: 0, backgroundColor: '#eee'}}>
            <Grid verticalAlign='middle'>
                <Grid.Column width={10}>
                    <Message.Header>{label}</Message.Header>
                </Grid.Column>
                {typeof onChange === 'function' && (
                    <Grid.Column width={2}>
                        <Button basic={true} compact={true} icon={true} labelPosition={'left'} floated={'right'} onClick={onChange}>
                            {isShow ? 'Свернуть' : 'Развернуть'}
                            <Icon name={isShow ? 'chevron up' : 'chevron down'} />
                        </Button>
                    </Grid.Column>
                )}
            </Grid>
        </Message>
    )
};

if (process.env.NODE_ENV === DEV_ENV) {
    PanelHeader.propTypes = {
        label: PropTypes.string,
        isShow: PropTypes.bool,
        onChange: PropTypes.func
    };
}

export default PanelHeader;