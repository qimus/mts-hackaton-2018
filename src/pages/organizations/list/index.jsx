import React, { Component } from 'react'

// ui
import {
    Item,
    List,
    Image,
    Label
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

export default class OrganizationsList extends Component {
    render() {
        const { organizations } = this.props;

        return (
            <Item.Group>
                {organizations.map((organization) => {
                    return (
                        <Item key={organization.id}>
                            <Item.Content>
                                <Item.Header>
                                    <Link to={`/organizations/${organization.id}`}>{organization.name} ({organization.level.name} ур.)</Link>
                                </Item.Header>
                                {organization.contacts && (
                                    <Item.Description>
                                        <List>
                                            <List.Item>
                                                <List.Icon name={'marker'} />
                                                <List.Content>
                                                    г. {organization.city.name}, {organization.contacts.address}
                                                </List.Content>
                                            </List.Item>

                                            <List.Item>
                                                <List.Icon name={'mail'} />
                                                <List.Content>
                                                    <a href={`mailto:${organization.contacts.email}`}>{organization.contacts.email}</a>
                                                </List.Content>
                                            </List.Item>

                                            {organization.contacts.phones.map((phone, i) => {
                                                return (
                                                    <List.Item key={i}>
                                                        <List.Icon name={'phone'} />
                                                        <List.Content>
                                                            {phone}
                                                        </List.Content>
                                                    </List.Item>
                                                )
                                            })}

                                        </List>
                                    </Item.Description>
                                )}
                                <Item.Extra>
                                    {organization.members.count >= 1 && (
                                        <div>
                                            <p>Участники ({organization.members.count}):</p>

                                            <List horizontal={true}>
                                                {organization.members.map((user) => {
                                                    return (
                                                        <List.Item key={user.id}>
                                                            {user.avatar_url && (<Image avatar={true} src={user.avatar_url} /> )}
                                                            {!user.avatar_url && (<List.Icon name={'user circle'} /> )}
                                                            <List.Content>
                                                                <List.Header>
                                                                    <Link to={`/users/${user.id}`}>
                                                                        {user.name} ({user.level} ур.)
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