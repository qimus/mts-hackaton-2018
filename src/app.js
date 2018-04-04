import React, { Component } from 'react'
import {
    Grid,
    Header,
    Form,
    Segment,
    Icon,
    Button,
    Message
} from 'semantic-ui-react'

export default class App extends Component {
    render() {
        return (
            <Grid textAlign={'center'} verticalAlign={'middle'}>
                <Grid.Column>
                    <Header as={'h2'} color={'teal'}>
                        <div className={'content'}>Авторизация</div>
                    </Header>
                    <Form size={'large'}>
                        <Segment>
                            <Form.Field>
                                <div className="ui left icon input">
                                    <Icon name={'user'}/>
                                    <input type="text" name="email" placeholder="Логин или e-mail" />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui left icon input">
                                    <Icon name={'lock'}/>
                                    <input type="password" name="password" placeholder="Пароль" />
                                </div>
                            </Form.Field>
                            <Button color={'teal'} size={'large'} fluid>Войти</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Впервые на сайте? <a href={'#'}>Присоединиться</a>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}
