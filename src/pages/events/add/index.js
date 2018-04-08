import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import {
    Segment,
    Header,
    Form,
    Grid,
    Button
} from 'semantic-ui-react'

import inline from 'components/redux-form/inline'
import Text from 'components/redux-form/text-input'
import TextArea from 'components/redux-form/text-area'
import Datepicker from 'components/redux-form/date-picker'
import Specializations from 'pages/sign-up/form/specialization'
import RadioGroup from 'components/redux-form/radiogroup'
import request from 'utils/request'
import api from 'constants/urls'
import EventMap from './event-map'

const inlineText = inline(Text);
const inlineDatepicker = inline(Datepicker);
const inlineSpec = inline(Specializations);
const inlineMap = inline(EventMap);
const inlineRadio = inline(RadioGroup);
const inlineTextarea = inline(TextArea);

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

    async componentDidMount() {
        const { user } = this.props;
        if (user.id) {
            let response = await request.get(`${api.specializations}`);
            this.setState({
                specializations: _.get(response, 'data.result', [])
            });
        }
    }

    createEvent = async (values) => {
        console.log(values);
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
                                name={'start_date'}
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
                                name={'end_date'}
                                label={'Завершение'}
                                timeFormat={'HH:mm'}
                                showTimeSelect
                                timeIntervals={10}
                                pickerOptions={{
                                    minDate: moment()
                                }}
                                component={inlineDatepicker}
                                labelWidth={3}/>
                            {this.state.specializations.length > 0 && (
                                <Field
                                    items={this.state.specializations}
                                    component={inlineSpec}
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
                                name={'hidden'}
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

const mapStateToProps = (state) => ({
    user: state.user
});

export default withRouter(connect(mapStateToProps)(AddEvent))