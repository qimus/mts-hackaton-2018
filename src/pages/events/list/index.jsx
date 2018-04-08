import React, { Component } from 'react'

// ui
import {
    Item,
    List,
    Image,
    Label
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

export default class EventsList extends Component {
    render() {
        const { events } = this.props;

        return (
            <Item.Group>
                {events.map((event) => {
                    return (
                        <Item key={event.id}>
                            <Item.Content>
                                <Item.Header>
                                    <Link to={`/events/${event.id}`}>{event.activity_template.name}</Link>
                                </Item.Header>
                                <Item.Meta>{event.description}</Item.Meta>
                                <Item.Description>
                                    <List>
                                        <List.Item>
                                            <List.Icon name={'users'} />
                                            <List.Content>
                                                <Link to={`/organizations/${event.organization.id}`}>
                                                    {event.organization.name}
                                                </Link>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name={'calendar'} />
                                            <List.Content>
                                                {event.start_at}{event.finish_at && <span> - {event.finish_at}</span>}
                                            </List.Content>
                                        </List.Item>
                                        {event.organization.contacts && (
                                            <List.Item>
                                                <List.Icon name={'marker'} />
                                                <List.Content>
                                                    г. {event.city.name}, {event.address}
                                                </List.Content>
                                            </List.Item>
                                        )}

                                    </List>
                                </Item.Description>
                                <Item.Extra>
                                    {event.invited.count >= 1 && (
                                        <div>
                                            <p>Участвуют ({event.invited.count}):</p>

                                            <List horizontal={true}>
                                                {event.invited.and_you && (
                                                    <List.Item>
                                                        <Label color={'green'}>Вы</Label>
                                                    </List.Item>
                                                )}
                                                {event.invited.users.map((user) => {
                                                    return (
                                                        <List.Item key={user.id}>
                                                            {user.avatar_url && (<Image avatar={true} src={user.avatar_url} /> )}
                                                            {!user.avatar_url && (<List.Icon name={'user circle'} /> )}
                                                            <List.Content>
                                                                <List.Header>
                                                                    <Link to={`/users/${user.id}`}>
                                                                        {user.name}
                                                                    </Link>
                                                                </List.Header>
                                                                {user.phone}
                                                            </List.Content>
                                                        </List.Item>
                                                    )
                                                })}

                                            </List>
                                        </div>
                                    )}

                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        )
    }
}