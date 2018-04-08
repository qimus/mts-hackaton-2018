import React, { Component } from 'react'
import {reduxForm, Field, SubmissionError, formValueSelector} from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import {
    Segment,
    Header,
    Form,
    Grid,
    Button
} from 'semantic-ui-react'

import { createActivity } from 'actions/event'

import inline from 'components/redux-form/inline'
import Text from 'components/redux-form/text-input'
import TextArea from 'components/redux-form/text-area'
import Datepicker from 'components/redux-form/date-picker'
import Specializations from 'pages/sign-up/form/specialization'
import RadioGroup from 'components/redux-form/radiogroup'
import api from 'constants/urls'
import EventMap from './event-map'
import Dropdown from 'components/redux-form/suggest'

const inlineText = inline(Text);
const inlineDatepicker = inline(Datepicker);
const inlineSpec = inline(Specializations);
const inlineMap = inline(EventMap);
const inlineRadio = inline(RadioGroup);
const inlineTextarea = inline(TextArea);
const InlineDropdown = inline(Dropdown);

const FORM_ID = 'new_event';

const visibleMap = [
    {
        name: 'Виден только подтвержденным пользователям',
        value: 1,
    },
    {
        name: 'Виден всем пользователям',
        value: 0
    }
];

class AddEvent extends Component {
    state = {
        specializations: []
    };

    createEvent = async (values) => {

        const { user } = this.props;

        const data = {
            description: values.description,
            address: _.get(values, 'address.address'),
            city_id: user.city.id,
            activity_template_id: values.activity_template_id,
            organization_id: user.organization.id,
            start_at: moment(values.start_at).format('YYYY-MM-DD HH:mm:ss'),
            finish_at: moment(values.finish_at).format('YYYY-MM-DD HH:mm:ss'),
            is_contacts_public: values.is_contacts_public,
            ...(_.get(values, 'address.coordinates', {}))
        };

        try {
            await this.props.createActivity(data);
            this.props.history.push('/events');
        } catch (e) {
            throw new SubmissionError(e.response.data.errors);
        }
    };

    handleLoadSpecializations = ({ value, options = []}) => {
        let selectedOption = _.find(options, {id: value});
        if (selectedOption) {
            this.setState({
                specializations: selectedOption.specializations
            });
        }
    };

    render() {
        const { user, handleSubmit } = this.props;

        return (
            <Segment>
                <Header as={'h3'}>Новое событие</Header>
                <Grid>
                    <Grid.Column width={13}>
                        <Form onSubmit={handleSubmit(this.createEvent)}>
                            <Field
                                label={'Название события'}
                                icon={'tag'}
                                labelWidth={3}
                                component={inlineText}
                                placeholder={'Название события'}
                                name={'name'}/>
                            <Field
                                name={'description'}
                                labelWidth={3}
                                label={'Расскажите немного об этом'}
                                component={inlineTextarea}/>
                            <Field
                                name={'start_at'}
                                label={'Старт'}
                                timeFormat={'HH:mm'}
                                showTimeSelect
                                timeIntervals={10}
                                pickerOptions={{
                                    minDate: moment()
                                }}
                                component={inlineDatepicker}
                                labelWidth={3}/>
                            <Field
                                name={'finish_at'}
                                label={'Завершение'}
                                timeFormat={'HH:mm'}
                                showTimeSelect
                                timeIntervals={10}
                                pickerOptions={{
                                    minDate: moment()
                                }}
                                component={inlineDatepicker}
                                labelWidth={3}/>
                            <Field
                                component={InlineDropdown}
                                search={false}
                                labelWidth={3}
                                ajaxSource={api.activityTemplates}
                                handleChange={this.handleLoadSpecializations}
                                eager
                                name={'activity_template_id'}
                                label={'Тип события'}
                                placeholder={'Тип события'}
                            />
                            {this.state.specializations.length > 0 && (
                                <Field
                                    items={this.state.specializations}
                                    component={inlineSpec}
                                    withCheckboxes={false}
                                    columns={2}
                                    name={'specializations'}
                                    label={'Выберите специализации'}/>
                            )}
                            <Field
                                labelAlign={'top'}
                                component={inlineMap}
                                city={user.city.name}
                                label={'Выберите адрес'}
                                name={'address'}
                            />
                            <Field
                                component={inlineRadio}
                                label={'Видимость'}
                                items={visibleMap}
                                name={'is_contacts_public'}
                            />
                            <div style={{float: 'right'}}>
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    this.props.history.push('/')
                                }}>Отмена</Button>
                                <Button primary>Сохранить</Button>
                            </div>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment>
        )
    }
}

AddEvent = reduxForm({
    form: FORM_ID
})(AddEvent);

const selector = formValueSelector(FORM_ID);

const mapStateToProps = (state) => ({
    user: state.user,
    formValues: {
        activityTemplates: selector(state, 'activity_template_id')
    }
});

const mapDispatchToProps = (dispatch) => ({
    createActivity: bindActionCreators(createActivity, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEvent))