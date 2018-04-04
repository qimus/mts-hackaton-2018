import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Confirm
} from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

class ConfirmDialog extends Component {
    state = {
        open: this.props.open || false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.open != this.props.open) {
            this.setState({
                open: nextProps.open
            })
        }
    }

    handleClose = () => {
        this.setState({ open: false })

        if (this.props.closeCallback) {
            this.props.closeCallback()
        }
    };

    handleConfirm = (e, item) => {
        if (this.props.confirmCallback) {
            this.props.confirmCallback()
        }

        this.handleClose()
    };

    render() {
        const { open } = this.state;

        return (
            <Confirm
                open={open}
                header={this.props.header ? this.props.header : 'Подтверждение'}
                content={this.props.content ? this.props.content : 'Вы уверены что хотите совершить данное действие?'}
                onCancel={this.handleClose}
                onConfirm={this.handleConfirm}
                cancelButton={this.props.cancelButton ? this.props.cancelButton : 'Нет'}
                confirmButton={this.props.confirmButton ? this.props.confirmButton : 'Да'}
            />
        )
    }
}

if (process.env.NODE_ENV === DEV_ENV) {
    ConfirmDialog.propTypes = {
        open: PropTypes.bool,
        closeCallback: PropTypes.func,
        confirmCallback: PropTypes.func,
        header: PropTypes.any,
        content: PropTypes.any,
        cancelButton: PropTypes.string,
        confirmButton: PropTypes.string
    };
}

export default ConfirmDialog;