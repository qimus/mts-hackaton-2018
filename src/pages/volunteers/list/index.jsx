import React, { Component } from 'react'

// ui
import {
    Item,
    List,
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

export default class OrganizationsList extends Component {
    render() {
        const { users } = this.props;

        return (
            <Item.Group>
                {users.map((user) => {
                    return (
                        <Item key={user.id}>
                            <Item.Content>
                                <Item.Header>
                                    <Link to={`/profile/${user.id}`}>{user.name}</Link>
                                </Item.Header>
                                <Item.Description>
                                    <List>
                                        <List.Item>
                                            <List.Icon name={'mail'} />
                                            <List.Content>
                                                {user.login}
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name={'phone'} />
                                            <List.Content>
                                                {user.phone}
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Item.Description>
                                {/*{organization.contacts && (*/}
                                    {/*<Item.Description>*/}
                                        {/*<List>*/}
                                            {/*<List.Item>*/}
                                                {/*<List.Icon name={'marker'} />*/}
                                                {/*<List.Content>*/}
                                                    {/*г. {organization.city.name}, {organization.contacts.address}*/}
                                                {/*</List.Content>*/}
                                            {/*</List.Item>*/}

                                            {/*<List.Item>*/}
                                                {/*<List.Icon name={'mail'} />*/}
                                                {/*<List.Content>*/}
                                                    {/*<a href={`mailto:${organization.contacts.email}`}>{organization.contacts.email}</a>*/}
                                                {/*</List.Content>*/}
                                            {/*</List.Item>*/}

                                            {/*{organization.contacts.phones.map((phone, i) => {*/}
                                                {/*return (*/}
                                                    {/*<List.Item key={i}>*/}
                                                        {/*<List.Icon name={'phone'} />*/}
                                                        {/*<List.Content>*/}
                                                            {/*{phone}*/}
                                                        {/*</List.Content>*/}
                                                    {/*</List.Item>*/}
                                                {/*)*/}
                                            {/*})}*/}

                                        {/*</List>*/}
                                    {/*</Item.Description>*/}
                                {/*)}*/}

                                {/*<Item.Extra>*/}
                                    {/*<Grid columns={16}>*/}
                                        {/*<Grid.Row>*/}
                                            {/*<Grid.Column width={8}>*/}
                                                {/*{organization.members.length >= 1 && (*/}
                                                    {/*<div>*/}
                                                        {/*<p>Представители ({organization.members.length}):</p>*/}

                                                        {/*<List horizontal={true}>*/}
                                                            {/*{organization.members.map((user) => {*/}
                                                                {/*return (*/}
                                                                    {/*<List.Item key={user.id}>*/}
                                                                        {/*{user.avatar_url && (<Image avatar={true} src={user.avatar_url} /> )}*/}
                                                                        {/*{!user.avatar_url && (<List.Icon name={'user circle'} /> )}*/}
                                                                        {/*<List.Content>*/}
                                                                            {/*<List.Header>*/}
                                                                                {/*<Link to={`/users/${user.id}`}>*/}
                                                                                    {/*{user.name} ({user.level.name} ур.)*/}
                                                                                {/*</Link>*/}
                                                                            {/*</List.Header>*/}
                                                                            {/*{user.phone}*/}
                                                                        {/*</List.Content>*/}
                                                                    {/*</List.Item>*/}
                                                                {/*)*/}
                                                            {/*})}*/}

                                                        {/*</List>*/}
                                                    {/*</div>*/}
                                                {/*)}*/}
                                            {/*</Grid.Column>*/}

                                            {/*<Grid.Column width={8}>*/}
                                                {/*{organization.specializations.length >= 1 && (*/}
                                                    {/*<div>*/}
                                                        {/*<p>Специализация ({organization.specializations.length}):</p>*/}

                                                        {/*<List horizontal={true}>*/}
                                                            {/*{organization.specializations.map((specialization) => {*/}
                                                                {/*return (*/}
                                                                    {/*<List.Item style={itemStyle} key={specialization.id}>*/}
                                                                        {/*<List.Icon style={specStyle} className={`specialization ${specialization.icon}`} />*/}
                                                                        {/*<List.Content>{specialization.name}</List.Content>*/}
                                                                    {/*</List.Item>*/}
                                                                {/*)*/}
                                                            {/*})}*/}

                                                        {/*</List>*/}
                                                    {/*</div>*/}
                                                {/*)}*/}
                                            {/*</Grid.Column>*/}
                                        {/*</Grid.Row>*/}
                                    {/*</Grid>*/}


                                {/*</Item.Extra>*/}
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        )
    }
}