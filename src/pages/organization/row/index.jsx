import React, { Component } from 'react'

// ui
import {
    Header,
    List,
    Image,
    Grid,
    Segment,
    Item
} from 'semantic-ui-react';

import EventRow from '../../events/row'

import { Link } from 'react-router-dom';

const specStyle = {
    width: 40,
    height: 40,
};

const itemStyle = {
    padding: 0,
    margin: '8px 8px 0 0'
};

export default class OrganizationRow extends Component {
    render() {
        const { organization, events } = this.props;

        return (
            <div>
                <Header as={'h1'} dividing={true}>{organization.name}</Header>

                <Grid columns={16}>
                    <Grid.Row>
                        <Grid.Column width={8}>
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

                            {organization.members.length > 0 && (
                                <div>
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
                                </div>
                            )}

                            {events.length > 0 && (
                                <div>
                                    <Header as={'h3'} dividing={true} style={{marginTop: 30}}>Текущие события</Header>
                                    <Item.Group>
                                        {events.map((event) => {
                                            return (
                                                <EventRow event={event} key={event.id} />
                                            )
                                        })}
                                    </Item.Group>


                                </div>

                            )}

                        </Grid.Column>
                        <Grid.Column width={8}>
                            {organization.specializations.length > 0 && (
                                <Segment floated={'right'}>
                                    <p><strong>Специализация:</strong></p>
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
                                </Segment>
                            )}
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>


        )
    }
}