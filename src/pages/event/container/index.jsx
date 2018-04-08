import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// ui
import {
    Segment,
    Dimmer,
    Loader
} from 'semantic-ui-react';

import EventRow from '../row';

// actions
import { getActivity } from "../../../actions/event";

const loaderStyle = {height: 50};

class EventContainer extends Component {
    componentDidMount() {
        this.props.getActivity(this.props.match.params.id);
    }

    render() {
        const { isFetching, event } = this.props;

        if (isFetching || !event) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader indeterminate>Получение события...</Loader>
                    </Dimmer>

                    <div style={loaderStyle}></div>
                </Segment>
            );
        }

        return (
            <div>
                <EventRow event={event} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getActivity: bindActionCreators(getActivity, dispatch)
});

const mapStateToProps = (state) => ({
    event: state.event.event,
    isFetching: state.event.isFetching
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventContainer))