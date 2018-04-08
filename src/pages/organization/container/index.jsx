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

import OrganizationRow from '../row';

// actions
import { getOrganization } from "../../../actions/organization";
import { getActivities } from "../../../actions/events";

const loaderStyle = {height: 50};

class OrganizationContainer extends Component {
    async componentDidMount() {
        await this.props.getOrganization(this.props.match.params.id);
        await this.props.getActivities({organizationId: this.props.match.params.id});
    }

    render() {
        const { isFetching, organization, events } = this.props;

        if (isFetching || !organization) {
            return (
                <Segment>
                    <Dimmer active>
                        <Loader indeterminate>Получение организации...</Loader>
                    </Dimmer>

                    <div style={loaderStyle}></div>
                </Segment>
            );
        }

        return (
            <div>
                <OrganizationRow organization={organization} events={events} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getOrganization: bindActionCreators(getOrganization, dispatch),
    getActivities: bindActionCreators(getActivities, dispatch)
});

const mapStateToProps = (state) => ({
    organization: state.organization.organization,
    events: state.events.result,
    isFetching: state.organization.isFetching || state.events.isFetching
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrganizationContainer))