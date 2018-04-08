import React, { Component } from 'react'

// ui
import {
    Item,
    List,
    Image,
    Grid,
    Segment
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';

const specStyle = {
    width: 40,
    height: 40,
};

const itemStyle = {
    padding: 0,
    margin: '8px 8px 0 0'
};

export default class OrganizationsList extends Component {
    render() {
        const { organizations } = this.props;

        return (
            <Item.Group>
                {organizations.map((organization) => {
                    return (
                        <Item key={organization.id} style={{marginBottom: 30}}>
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
                                    {
                                        (organization.members.length > 0 || organization.specializations.length > 0) &&
                                        (
                                            <Segment>
                                                <Grid columns={16} divided={true}>
                                                    <Grid.Row>
                                                            {organization.members.length >= 1 && (
                                                                <Grid.Column width={8}>
                                                                    <p>Представители ({organization.members.length}):</p>

                                                                    <List horizontal={true}>
                                                                        {organization.members.map((user) => {
                                                                            return (
                                                                                <List.Item key={user.id}>
                                                                                    {user.avatar_url && (<Image avatar={true} src={user.avatar_url} /> )}
                                                                                    {!user.avatar_url && (<List.Icon name={'user circle'} /> )}
                                                                                    <List.Content>
                                                                                        <List.Header>
                                                                                            <Link to={`/users/${user.id}`}>
                                                                                                {user.name} ({user.level.name} ур.)
                                                                                            </Link>
                                                                                        </List.Header>
                                                                                        {user.phone}
                                                                                    </List.Content>
                                                                                </List.Item>
                                                                            )
                                                                        })}

                                                                    </List>
                                                                </Grid.Column>
                                                            )}

                                                            {organization.specializations.length >= 1 && (
                                                                <Grid.Column width={8}>
                                                                    <p>Специализация ({organization.specializations.length}):</p>

                                                                    <List horizontal={true}>
                                                                        {organization.specializations.map((specialization) => {
                                                                            return (
                                                                                <List.Item style={itemStyle} key={specialization.id}>
                                                                                    <List.Icon style={specStyle} className={`specialization ${specialization.icon}`} />
                                                                                    <List.Content>{specialization.name}</List.Content>
                                                                                </List.Item>
                                                                            )
                                                                        })}

                                                                    </List>
                                                                </Grid.Column>
                                                            )}

                                                    </Grid.Row>
                                                </Grid>
                                            </Segment>
                                        )
                                    }

                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        )
    }
}