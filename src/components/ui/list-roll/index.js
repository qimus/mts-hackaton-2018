import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    List
} from 'semantic-ui-react'

export default class ListRoll extends Component {

    static defaultProps = {
        count: 10,
        items: []
    };

    state = {
        isExpand: false
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({isExpand: !this.state.isExpand});
    };

    render() {
        const { count, items, ...rest } = this.props;
        const { isExpand } = this.state;
        let renderItems, link;

        if (isExpand || count >= items.length) {
            renderItems = [].concat(items);
            if (count <= items.length) {
                link = <a href='#' onClick={this.handleChange}>свернуть</a>;
            }
        } else {
            renderItems = items.slice(0, count);
            link = <a href='#' onClick={this.handleChange}>показать еще {items.length - renderItems.length}</a>;
        }

        let body = renderItems.map((item, i) => {
            return (
                <List.Item key={i}>{item}</List.Item>
            )
        });

        return (
            <div>
                <List {...rest}>
                    {body}
                </List>
                {link}
            </div>
        )
    }
}

ListRoll.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array
};