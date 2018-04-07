import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'

const FORM_ID = 'sign-up';

class SignUpForm extends Component {
    render() {

    }
}

SignUpForm = reduxForm({
    form: FORM_ID
})(SignUpForm);

export default connect()(SignUpForm);