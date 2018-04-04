import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    Modal,
    Button,
    Icon
} from 'semantic-ui-react'

import { DEV_ENV } from 'workflow/constants/app'

class AlertDialog extends Component {

    static defaultProps = {
        open: false,
        title: 'Внимание!',
        message: '',
    }

    state = {
        open: this.props.open || false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.open !== this.props.open) {
            this.setState({
                open: nextProps.open
            })
        }
    }

    handleClose = () => {
        this.setState({ open: false });
        typeof this.props.onClose === 'function' && this.props.onClose();
    };

    render() {
        const { title, message } = this.props;

        return (
            <Modal size='small' open={ this.state.open } closeOnDimmerClick={ false }>
                <Modal.Header>
                    { title }
                </Modal.Header>
                <Modal.Content image={true}>
                    <div className='image'>
                        <Icon name='warning' size='large' color='red' />
                    </div>
                    <Modal.Description>
                        { message }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='grey' onClick={ this.handleClose } >
                        Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

if (process.env.NODE_ENV === DEV_ENV) {
    AlertDialog.propTypes = {
        open: PropTypes.bool,
        title: PropTypes.any,
        message: PropTypes.any.isRequired,
        onClose: PropTypes.func,
    };
}

export default AlertDialog;