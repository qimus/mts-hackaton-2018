import React, { Component } from 'react'
import {
    Grid,
    Header,
    Form,
    Segment
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
                            <Form.Field placeholder={'E-mail address'}/>
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        )
    }
}
