import React from 'react'
import PropTypes from 'prop-types'
import {
    Icon,
    Popup,
    List,
    Grid
} from 'semantic-ui-react'

const InfoIcon = ({header, items = [], item = '', iconName = 'info circle'}) => {
    let content = item;
    if (items.length > 0) {
        content = (
            <List bulleted>
                {items.map(item => <List.Item>{item}</List.Item>)}
            </List>
        );
    }

    if (header) {
        content = (
            <Grid columns={1}>
                <Grid.Column><h4>{header}</h4></Grid.Column>
                <Grid.Column>{content}</Grid.Column>
            </Grid>
        )
    }

    return <Popup trigger={<Icon name={iconName} />} content={content}/>
};

InfoIcon.propTypes = {
    header: PropTypes.string,
    items: PropTypes.array,
    item: PropTypes.string,
    iconName: PropTypes.string
};

export default InfoIcon;