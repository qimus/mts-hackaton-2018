import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import {
    Form,
    Message,
    Header,
    Button,
    Segment
} from 'semantic-ui-react'
import TextInput from 'components/redux-form/text-input'
import inline from 'components/redux-form/inline'

import logo from 'resource/logo.png'

const FORM_ID = 'sign-up';


class SignUpForm extends Component {

    register = () => {

    };

    render() {
        const { handleSubmit, valid = true } = this.props;

        return (
            <div style={{marginTop: 50}}>
                <img src={logo} width={128}/>
                <Header as={'h2'} color={'teal'}>
                    <div className={'content'}>Регистрация</div>
                </Header>
                <Form size={'large'} onSubmit={handleSubmit(this.register)} error={!valid}>
                    <Segment>
                        <Field
                            component={inline(TextInput)}
                            icon={'user'}
                            name={'login'}
                            label={'Email'}
                            placeholder={'Email'}
                        />
                        <Field
                            component={inline(TextInput)}
                            icon={'lock'}
                            name={'password'}
                            type={'password'}
                            label={'Пароль'}
                            placeholder={'Пароль'}
                        />
                        <Field
                            component={inline(TextInput)}
                            icon={'lock'}
                            name={'password_repeat'}
                            type={'password'}
                            label={'Повторите пароль'}
                            placeholder={'Повторите пароль'}
                        />

                        <Button color={'teal'} size={'large'} fluid>Зарегистрироваться</Button>
                    </Segment>
                </Form>
            </div>
        )
    }
}

SignUpForm = reduxForm({
    form: FORM_ID
})(SignUpForm);

export default connect()(SignUpForm);