import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
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
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

import logo from 'resource/logo.png'

//actions
import { auth } from 'actions/user'

import TextInput from 'components/redux-form/text-input'

const FORM_ID = 'login';

const validate = (values) => {
    let errors = {};

    if (!values.login) {
        errors['login'] = 'Необходимо указать "Логин"';
    }

    if (!values.password || values.password.length < 6) {
        errors['password'] = 'Пароль должен содержать не менее 6 символов'
    }

    return errors;
};

@withRouter
class LoginForm extends Component {

    componentDidMount() {
        if (this.props.user.id) {
            return this.props.history.push('/');
        }
    }

    authenticate = async (values) => {
        const { login, password } = values;

        try {
            await this.props.auth({ login, password });
            this.props.history.push('/profile');
        } catch (e) {
            console.log(e);
        }
    };

    render() {

        const { handleSubmit, valid = true, user } = this.props;

        return (
            <div style={{marginTop: 50}}>
                <img src={logo} width={128}/>
                <Header as={'h2'} color={'teal'}>
                    <div className={'content'}>Авторизация</div>
                </Header>
                <Form size={'large'} onSubmit={handleSubmit(this.authenticate)} error={!valid || !!user.error}>
                    <Segment>
                        <Field
                            component={TextInput}
                            icon={'user'}
                            name={'login'}
                            placeholder={'e-mail'}
                        />
                        <Field
                            component={TextInput}
                            icon={'lock'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Пароль'}
                        />
                        {user.error && (
                            <Message error content={user.error}/>
                        )}
                        <Button color={'teal'} size={'large'} fluid>Войти</Button>
                    </Segment>
                </Form>
                <Message>
                    Впервые на сайте? <Link to={'sign-up'}>Присоединиться</Link>
                </Message>
            </div>
        )
    }
}

LoginForm = reduxForm({
    form: FORM_ID,
    validate
})(LoginForm);

const mapDispatchToProps = (dispatch) => ({
    auth: bindActionCreators(auth, dispatch)
});

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)