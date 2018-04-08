import React, { Component } from 'react'

// ui
import {
    Header,
    List,
    Label,
    Segment,
    Image,
    Grid
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

export default class EventRow extends Component {
    render() {
        const { event } = this.props;

        return (
            <div>
                <Header as={'h1'} dividing={true}>{event.activity_template.name}</Header>

                <Grid columns={16}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <List>
                                <List.Item>
                                    <strong>Старт:</strong> {event.start_at}
                                </List.Item>

                                {event.finish_at && (<List.Item>
                                    <strong>Завершение:</strong> {event.finish_at}
                                </List.Item>)}

                                <List.Item>
                                    <strong>Адрес:</strong> г. {event.city.name}, {event.address}
                                </List.Item>

                                <List.Item>
                                    <strong>Организатор: </strong>
                                    <Link to={`/organizations/${event.organization.id}`}>
                                        {event.organization.name} ({event.organization.level.name} ур.)
                                    </Link>
                                </List.Item>

                            </List>

                            {event.organization.members.length > 0 && (
                                <List.Item>
                                    <strong>Представитель: </strong>
                                    <Link to={`/users/${event.organization.members[0].id}`}>{event.organization.members[0].name}</Link>
                                </List.Item>

                            )}

                            <Header as={'h3'}>
                                <Link to={`/activities/${event.id}/participants`}>
                                    Участники ({event.invited.count})
                                </Link>
                            </Header>

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
                                                        {user.name} ({user.level} ур.)
                                                    </Link>
                                                </List.Header>
                                                {user.phone}
                                            </List.Content>
                                        </List.Item>
                                    )
                                })}

                            </List>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            {event.activity_template.specializations.length > 0 && (
                                <Segment floated={'right'}>
                                    <p><strong>Вы получите уровни в:</strong></p>
                                    <List horizontal={true}>
                                        {event.activity_template.specializations.map((specialization) => {
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

                    <Grid.Row>
                        <Grid.Column width={16}>
                            <p><strong>Описание:</strong></p>
                            <div>{event.description}</div>


                        </Grid.Column>
                    </Grid.Row>

                </Grid>
            </div>


        )
    }
}