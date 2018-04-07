import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector, change } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
    Form,
    Message,
    Header,
    Button
} from 'semantic-ui-react'
import TextInput from 'components/redux-form/text-input'
import Dropdown from 'components/redux-form/suggest'
import Search from 'components/redux-form/search'
import inline from 'components/redux-form/inline'
import api from 'constants/urls'

import logo from 'resource/logo.png'

const FORM_ID = 'sign-up';

const style = {
    container: {
        marginTop: 50
    }
};

const orgTypes = [
    {
        id: 1,
        name: 'Частное лицо'
    },
    {
        id: 2,
        name: 'Организация'
    }
];

const TYPE_ORG = 2;

const InlineDropdown = inline(Dropdown);
const InlineSearch = inline(Search);
const InlineText = inline(TextInput);

class SignUpForm extends Component {

    state = {
        orgNotFound: false
    };

    register = () => {

    };

    handleBlurOrganization = (params) => {
        const { results } = params;

        this.setState({
            orgNotFound: true
        })
    };

    handleOrganizationSelect = ({ contacts = {}}) => {
        this.props.changeValue(FORM_ID, 'address', contacts.address || '');
        this.props.changeValue(FORM_ID, 'inn', contacts.inn || '');
        this.props.changeValue(FORM_ID, 'organization_email', contacts.email || '');
    };

    render() {
        const {
            handleSubmit,
            valid = true,
            formValues: {
                userType,
                orgType,
                cityId,
                organization = {}
            }
        } = this.props;

        return (
            <div style={style.container}>
                <img src={logo} width={128}/>
                <Header as={'h2'} color={'teal'}>
                    <div className={'content'}>Регистрация</div>
                </Header>
                <Form size={'large'} onSubmit={handleSubmit(this.register)} error={!valid}>
                    <Field
                        component={InlineText}
                        icon={'user'}
                        name={'login'}
                        label={'Email'}
                        placeholder={'Email'}
                    />
                    <Field
                        component={InlineText}
                        icon={'user circle'}
                        name={'name'}
                        label={'Имя'}
                        placeholder={'Имя'}
                    />
                    <Field
                        component={InlineText}
                        icon={'phone'}
                        name={'phone'}
                        label={'Телефон'}
                        placeholder={'Телефон'}
                    />
                    <Field
                        component={InlineDropdown}
                        search={false}
                        ajaxSource={api.userTypes}
                        eager
                        icon={'phone'}
                        name={'userType'}
                        label={'Тип пользователя'}
                        placeholder={'Тип пользователя'}
                    />
                    {userType == TYPE_ORG && (
                        <Field
                            component={InlineDropdown}
                            search={false}
                            titleMap={orgTypes}
                            name={'orgType'}
                            label={'Тип'}
                            placeholder={'Тип'}
                        />
                    )}
                    {userType == TYPE_ORG && orgType == TYPE_ORG && (
                        <Field
                            component={InlineDropdown}
                            eager
                            ajaxSource={api.cities}
                            name={'cityId'}
                            label={'Город'}
                            placeholder={'Город'}
                        />
                    )}
                    {userType == TYPE_ORG && orgType == TYPE_ORG && cityId && (
                        <Field
                            component={InlineSearch}
                            ajaxSource={`${api.organizations}?city_id=${cityId}`}
                            name={'organization'}
                            showNoResults={true}
                            label={'Организация'}
                            handleBlur={this.handleBlurOrganization}
                            handleResultSelect={this.handleOrganizationSelect}
                            handleChange={this.handleOrganizationSelect}
                            placeholder={'Организация'}
                        />
                    )}
                    {userType == TYPE_ORG && orgType == TYPE_ORG && cityId && (organization.id || this.state.orgNotFound) && (
                        <div>
                            <Field
                                disabled={organization.id}
                                component={InlineText}
                                name={'address'}
                                type={'text'}
                                label={'Адрес'}
                                placeholder={'Адрес'}
                            />
                            <Field
                                disabled={organization.id}
                                component={InlineText}
                                name={'organization_email'}
                                type={'text'}
                                label={'Email'}
                                placeholder={'Email'}
                            />
                            <Field
                                disabled={organization.id}
                                component={InlineText}
                                name={'inn'}
                                type={'text'}
                                label={'ИНН'}
                                placeholder={'ИНН'}
                            />
                        </div>
                    )}
                    <Field
                        component={InlineText}
                        icon={'lock'}
                        name={'password'}
                        type={'password'}
                        label={'Пароль'}
                        placeholder={'Пароль'}
                    />
                    <Field
                        component={InlineText}
                        icon={'lock'}
                        name={'password_repeat'}
                        type={'password'}
                        label={'Повторите пароль'}
                        placeholder={'Повторите пароль'}
                    />

                    <Button color={'teal'} size={'large'} fluid style={{marginTop: 10}}>Зарегистрироваться</Button>
                </Form>
            </div>
        )
    }
}

SignUpForm = reduxForm({
    form: FORM_ID
})(SignUpForm);

const selector = formValueSelector(FORM_ID);

const mapStateToProps = (state) => ({
    formValues: {
        userType: selector(state, 'userType'),
        orgType: selector(state, 'orgType'),
        cityId: selector(state, 'cityId'),
        organization: selector(state, 'organization')
    }
});

const mapDispatchToProps = (dispatch) => ({
    changeValue: bindActionCreators(change, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);