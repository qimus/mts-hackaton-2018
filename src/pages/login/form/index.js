import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Field,
    reduxForm
} from 'redux-form'
import {
    Header,
    Form,
    Segment,
    Button,
    Message
} from 'semantic-ui-react'

import TextInput from 'components/redux-form/text-input'

const FORM_ID = 'login';

class LoginForm extends Component {
    render() {
        return (
            <div>
                <Header as={'h2'} color={'teal'}>
                    <div className={'content'}>Авторизация</div>
                </Header>
                <Form size={'large'}>
                    <Segment>
                        <Field
                            component={TextInput}
                            icon={'user'}
                            name={'login'}
                            placeholder={'Логин или e-mail'}
                        />
                        <Field
                            component={TextInput}
                            icon={'lock'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Пароль'}
                        />
                        <Button color={'teal'} size={'large'} fluid>Войти</Button>
                    </Segment>
                </Form>
                <Message>
                    Впервые на сайте? <a href={'#'}>Присоединиться</a>
                </Message>
            </div>
        )
    }
}

LoginForm = reduxForm({
    form: FORM_ID
})(LoginForm)

export default connect()(LoginForm)