import React, { Component } from 'react'

// ui
import {
    Item
} from 'semantic-ui-react';

import EventRow from '../row';

export default class EventsList extends Component {
    render() {
        const { events } = this.props;

        return (
            <Item.Group>
                {events.map((event) => {
                    return (
                        <EventRow event={event} key={event.id} />
                    )
                })}
            </Item.Group>
        )
    }
}