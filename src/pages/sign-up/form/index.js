import React, { Component } from 'react'
import { reduxForm, Field, formValueSelector, change, SubmissionError } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import {
    Form,
    Header,
    Button
} from 'semantic-ui-react'
import TextInput from 'components/redux-form/text-input'
import Dropdown from 'components/redux-form/suggest'
import Search from 'components/redux-form/search'
import inline from 'components/redux-form/inline'
import Specializations from './specialization'
import api from 'constants/urls'
import request from 'utils/request'
import { register } from 'actions/user'
import { withRouter } from 'react-router'

import logo from 'resource/logo.png'

import {
    TYPE_ORG,
    TYPE_SPONSOR
} from 'constants/user'

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

const InlineDropdown = inline(Dropdown);
const InlineSearch = inline(Search);
const InlineText = inline(TextInput);
const InlineSpecializations = inline(Specializations);

class SignUpForm extends Component {

    state = {
        orgNotFound: false,
        specializations: []
    };

    register = async (values) => {

        let data = {
            login: values.login,
            name: values.name,
            phone: values.phone,
            city_id: values.city_id,
            type_id: values.type_id,
            password: values.password,
            're-password': values.re_password,
            organization_id: _.get(values, 'organization.id'),
            extra: { ...(values.extra || {}), name: _.get(values, 'organization.title') },
            specializations: values.specializations
        };

        try {
            await this.props.register(data);
            this.props.history.push('/profile');
        } catch (e) {
            throw new SubmissionError(e.response.data.errors);
        }
    };

    handleBlurOrganization = () => {
        this.setState({
            orgNotFound: true
        })
    };

    handleLoadSpecialization = async ({ value }) => {
        let response = await request.get(`${api.specializations}`, {user_type_id: value});
        this.setState({
            specializations: _.get(response, 'data.result', [])
        });
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
                        eager
                        ajaxSource={api.cities}
                        name={'city_id'}
                        label={'Город'}
                        placeholder={'Город'}
                    />
                    <Field
                        component={InlineDropdown}
                        search={false}
                        ajaxSource={api.userTypes}
                        handleChange={this.handleLoadSpecialization}
                        eager
                        icon={'phone'}
                        name={'type_id'}
                        label={'Тип пользователя'}
                        placeholder={'Тип пользователя'}
                    />
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
                        name={'re_password'}
                        type={'password'}
                        label={'Повторите пароль'}
                        placeholder={'Повторите пароль'}
                    />
                    {userType == TYPE_SPONSOR && (
                        <Field
                            component={InlineDropdown}
                            search={false}
                            titleMap={orgTypes}
                            name={'orgType'}
                            label={'Тип'}
                            placeholder={'Тип'}
                        />
                    )}
                    {(userType == TYPE_SPONSOR && orgType == TYPE_ORG || userType == TYPE_ORG) && cityId && (
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
                    {(userType == TYPE_SPONSOR && orgType == TYPE_ORG || userType == TYPE_ORG) && cityId && (organization.id || this.state.orgNotFound) && (
                        <div>
                            <Field
                                disabled={organization.id}
                                component={InlineText}
                                name={'extra.address'}
                                type={'text'}
                                label={'Адрес'}
                                placeholder={'Адрес'}
                            />
                            <Field
                                disabled={organization.id}
                                component={InlineText}
                                name={'extra.email'}
                                type={'text'}
                                label={'Email'}
                                placeholder={'Email'}
                            />
                            <Field
                                disabled={organization.id}
                                component={InlineText}
                                name={'extra.inn'}
                                type={'text'}
                                label={'ИНН'}
                                placeholder={'ИНН'}
                            />
                        </div>
                    )}
                    {this.state.specializations.length > 0 && (
                        <Field
                            component={InlineSpecializations}
                            items={this.state.specializations}
                            name={'specializations'}
                            label={'Выберите специализации'}
                        />
                    )}

                    <Button
                        color={'teal'}
                        size={'large'}
                        style={{marginTop: 10, width: 300}}>
                        Зарегистрироваться
                    </Button>
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
        userType: selector(state, 'type_id'),
        orgType: selector(state, 'orgType'),
        cityId: selector(state, 'city_id'),
        organization: selector(state, 'organization')
    }
});

const mapDispatchToProps = (dispatch) => ({
    changeValue: bindActionCreators(change, dispatch),
    register: bindActionCreators(register, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));